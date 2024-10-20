"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Camera,
  CameraIcon,
  Coins,
  Loader2,
  Upload,
  Wallet,
} from "lucide-react";
import Image from "next/image";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { wagmiAbi } from "./abi";
import {
  account,
  publicClient,
  skalePublicClient,
  skaleWalletClient,
  walletClient,
} from "./config";
import { readFromBlobId, storeStringAndGetBlobId } from "./utility/walrus";
import { Animal, useAppContext } from "./AppContextProvider";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    'Return what animal specie the picture is, followed by a description of the image.\n\nOutput Format:\nAnimal: [animal specie]\nDescription: [image description]\n\nIf there is no animal, return "No Animal"\n\n',
});

export default function Home() {
  const { animals, setAnimals } = useAppContext();

  const { primaryWallet } = useDynamicContext();
  const publicKey = primaryWallet?.address;

  const [step, setStep] = useState(1);
  const [image, setImage] = useState<string | null>(null);
  const [nftData, setNftData] = useState<object | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [chain, setChain] = useState("skale");

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error("Error accessing camera:", err));
    }
  }, []);

  const addAnimalFromNft = (nftData: Animal) => {
    console.log(nftData);

    // Append the new animal to the existing animals array
    setAnimals((prevAnimals) => [nftData, ...prevAnimals]);
  };

  const handleCapture = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);
      const imageDataUrl = canvas.toDataURL("image/jpeg");
      setImage(imageDataUrl);
      setStep(2);
    }
  };

  const handleMintNFT = async () => {
    setIsLoading(true);
    try {
      const format = image?.split(";")[0].slice(5);
      const base64Image = image?.split(",")[1];

      const result = await model.generateContent([
        "Analyze this image and tell me what animal species it is, followed by a description of the image.",
        {
          inlineData: {
            mimeType: format ?? "image/jpeg",
            data: base64Image ?? "",
          },
        },
      ]);

      const geminiResponse = await result.response;
      const text = geminiResponse.text();

      // Parse the response to extract species and description
      const lines = text.split("\n");
      let species = "Unknown";
      let description = "";

      for (const line of lines) {
        if (line.startsWith("Animal:")) {
          species = line.split(":")[1].trim();
        } else if (line.startsWith("Description:")) {
          description = line.split(":")[1].trim();
        }
      }

      if (
        species === "Unknown" ||
        species === "No Animal" ||
        text.includes("No Animal")
      ) {
        handleNonAnimal(description);
        return;
      }

      // const mintNftResponse = await fetch("/api/mint-nft", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body,
      // });

      const imageBlobId = (await storeStringAndGetBlobId(image ?? "")) ?? "";

      const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      }).format(new Date());

      const nftData = {
        id: animals.length + 1,
        name: `Ether Go Record: ${species}`,
        species,
        image,
        description,
        latitude: "40.7468733",
        longitude: "-73.9947449",
        date: formattedDate,
      };
      if (chain == "polygon") {
        if (account && walletClient) {
          const { request } = await publicClient.simulateContract({
            address: "0x968d147e523eed619180030e502c95700f1228b6",
            abi: wagmiAbi,
            functionName: "addRecord",
            args: [
              nftData.species,
              nftData.latitude,
              nftData.longitude,
              nftData.date,
              imageBlobId,
              nftData.description,
            ],
            account,
          });
          const writeContractResponse = await walletClient.writeContract(
            request
          );
          console.log(writeContractResponse);
        }
      } else if (chain == "skale") {
        if (skalePublicClient && skaleWalletClient) {
          const account = await skaleWalletClient.getAddresses();
          if (!account || account.length === 0) {
            throw new Error("Account is not defined or empty");
          }
        
          const { request } = await skalePublicClient.simulateContract({
            address: "0x632e69488E25F1beC16A11cF1AA7B2261f2B94ef",
            abi: wagmiAbi,
            functionName: "addRecord",
            args: [
              nftData.species,
              nftData.latitude,
              nftData.longitude,
              nftData.date,
              imageBlobId,
              nftData.description,
            ],
            account: account[0], // Pass the correct account here
          });
        
          const writeContractResponse = await skaleWalletClient.writeContract(request);
          console.log(writeContractResponse);
        }        
      }

      addAnimalFromNft(nftData as Animal);

      const data = {
        ...nftData, // Spread the original data
        image: "",
      };

      setNftData(data);
      setStep(3);
    } catch (error) {
      console.error(error);
      setError("Error. Please try again. " + error);
      setStep(5);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNonAnimal = (description?: string) => {
    setError(
      `This doesn't appear to be an animal. Please try again with an animal photo. \n\nDescription: ` +
        description
    );
    setStep(5);
  };

  const resetApp = () => {
    setStep(1);
    setImage(null);
    setNftData(null);
    setError(null);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImage(result);
        setStep(2);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md align-middle justify-center">
      <h1 className="text-3xl font-bold mb-4 text-center text-white animate-pulse">
        Ether Go!
      </h1>
      <h1 className="text-3xl font-bold mb-10 text-center text-white">
        <DynamicWidget />

        {/* <button
          onClick={async () => {
            const { request } = await publicClient.simulateContract({
              address: "0x968d147e523eed619180030e502c95700f1228b6",
              abi: wagmiAbi,
              functionName: "addRecord",
              args: ["hi1","hi2","hi3","hi4","hi5","hi6"],
              account,
            });
            await walletClient.writeContract(request);
          }}
        >Add Record</button> */}
      </h1>
      {false && (
        <div>
          <button
            onClick={async () => {
              const response = await storeStringAndGetBlobId(
                "hi there12738ghsa8"
              );
              console.log(response);
            }}
          >
            Walrus Write
          </button>
          <button
            onClick={async () => {
              const response = await readFromBlobId(
                "Jay9FqAhWCAoQsq4v4Vi_QNs6-CR5O5JjnRlt-kb-mE"
              );
              console.log(response);
            }}
          >
            Walrus Read
          </button>
        </div>
      )}

      {!publicKey && (
        <Card className="bg-gradient-to-br from-purple-400 to-blue-500 border-4 border-yellow-400 rounded-xl shadow-lg overflow-hidden">
          <CardHeader className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4 animate-bounce">
              Welcome to Ether Go!
            </h2>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="mb-8 relative w-64 h-64">
              <Image
                src="/logo.webp"
                alt="EtherDex Logo"
                width={256}
                height={256}
                className="rounded-full animate-spin-slow"
              />
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <CameraIcon className="w-32 h-32 text-white animate-pulse" />
              </div>
            </div>
            <div className="space-y-6 w-full">
              <div
                className="flex items-center space-x-4 animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                <Wallet className="w-8 h-8 text-yellow-300" />
                <p className="text-white text-lg">
                  1. Connect your Ether Wallet
                </p>
              </div>
              <div
                className="flex items-center space-x-4 animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                <Camera className="w-8 h-8 text-green-300" />
                <p className="text-white text-lg">
                  2. Take a picture of an animal
                </p>
              </div>
              <div
                className="flex items-center space-x-4 animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                <Coins className="w-8 h-8 text-blue-300" />
                <p className="text-white text-lg">
                  3. Mint a Ether Go Record to support wildlife tracking
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {publicKey && step === 1 && (
        <Card className="bg-yellow-100 border-4 border-yellow-400 rounded-xl shadow-lg animate-bounce">
          <CardHeader className="text-center text-xl font-bold text-blue-600">
            Capture an Animal
          </CardHeader>
          <CardContent>
            {image && (
              <div className="mt-4">
                <img
                  src={image}
                  alt="Preview"
                  className="max-w-full h-auto max-h-64 rounded-lg"
                />
              </div>
            )}
            {!image && (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
            )}
            <Button
              onClick={handleCapture}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              <Camera className="mr-2 h-6 w-6" /> Capture
            </Button>
            <Button
              className="w-full mt-4"
              onClick={() => fileInputRef?.current?.click()}
            >
              <Upload className="mr-2 h-4 w-4" /> Upload
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </CardContent>
        </Card>
      )}

      {step === 2 && image && (
        <Card className="bg-green-100 border-4 border-green-400 rounded-xl shadow-lg animate-fade-in">
          <CardHeader className="text-center text-xl font-bold text-purple-600">
            Confirm Animal Photo
          </CardHeader>
          <CardContent>
            <Image
              src={image}
              alt="Captured"
              width={300}
              height={300}
              className="mb-4 max-w-full h-auto object-cover rounded-lg"
            />
            <div className="flex gap-2">
              <Button
                onClick={handleMintNFT}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                ) : (
                  "Add Record"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && nftData && (
        <Card className="bg-purple-100 border-4 border-purple-400 rounded-xl shadow-lg animate-fade-in">
          <CardHeader className="text-center text-xl font-bold text-green-600">
            Record Added Successfully!
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-center">
              Record Data:{" "}
              <a
                href={
                  "https://amoy.polygonscan.com/address/0x968d147e523eed619180030e502c95700f1228b6#readContract"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {JSON.stringify(nftData)}
              </a>
            </p>
            <Button
              onClick={resetApp}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Capture Another
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 5 && error && (
        <Alert variant="default" className="animate-shake">
          {image && (
            <div className="mt-4">
              <img
                src={image}
                alt="Preview"
                className="max-w-full h-auto max-h-64 rounded-lg"
              />
            </div>
          )}
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
          <Button
            onClick={resetApp}
            className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Try Again
          </Button>
        </Alert>
      )}
    </div>
  );
}
