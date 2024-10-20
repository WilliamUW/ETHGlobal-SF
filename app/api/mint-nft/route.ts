import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log("Minting NFT...");
  const { species, description, publicKey } = await request.json();

  const recipientAddress = `${publicKey}`;

  // const url = `https://${env}.crossmint.com/api/2022-06-09/collections/default/nfts`;
  // const options = {
  //   method: "POST",
  //   headers: {
  //     accept: "application/json",
  //     "content-type": "application/json",
  //     "x-api-key": apiKey as string,
  //   },
  //   body: JSON.stringify({
  //     recipient: recipientAddress,
  //     metadata: {
  //       name: `${species} NFT`,
  //       image:
  //         "https://images.prestigeonline.com/wp-content/uploads/sites/6/2024/09/26220054/459118063_539597145247047_8853740358288590339_n.jpeg",

  //       // image: image,
  //       description: description,
  //       attributes: [
  //         {
  //           trait_type: "Species",
  //           value: species,
  //         },
  //         {
  //           trait_type: "Latitude",
  //           value: "40.7468733",
  //         },
  //         {
  //           trait_type: "Longitude",
  //           value: "-73.9947449",
  //         },
  //         {
  //           trait_type: "Time Captured",
  //           value: new Date().toISOString(),
  //         },
  //       ],
  //     },
  //   }),
  // };

  try {
    // get blob id of image
    // get blob id of description string

    // write to smart contract

    // const response = await fetch(url, options);
    // const data = await response.json();

    // console.log("Minted NFT:", data);

    // if (!response.ok) {
    //   throw new Error(data.message || "Failed to mint NFT");
    // }

    const data = JSON.stringify({
      recipient: recipientAddress,
      metadata: {
        name: `${species} NFT`,
        image:
          "https://images.prestigeonline.com/wp-content/uploads/sites/6/2024/09/26220054/459118063_539597145247047_8853740358288590339_n.jpeg",

        // image: image,
        description: description,
        attributes: [
          {
            trait_type: "Species",
            value: species,
          },
          {
            trait_type: "Latitude",
            value: "40.7468733",
          },
          {
            trait_type: "Longitude",
            value: "-73.9947449",
          },
          {
            trait_type: "Time Captured",
            value: new Date().toISOString(),
          },
        ],
      },
    });
    console.log(data);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error adding:", error);
    return NextResponse.json({ error: "Failed to add" }, { status: 500 });
  }
}
