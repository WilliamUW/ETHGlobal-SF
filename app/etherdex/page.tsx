"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {useAppContext} from "../AppContextProvider";

export default function EtherDex() {
  const { animals } = useAppContext();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center text-white animate-pulse">Your EtherDex</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {animals.map((animal) => (
          <Card
            key={animal.id}
            className="bg-white border-4 border-yellow-400 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
          >
            <CardHeader className="p-4">
              <h2 className="text-xl font-bold text-purple-600">{animal.species}</h2>
            </CardHeader>
            <img
              src={animal.image}
              alt={animal.name}
              width={200}
              height={200}
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-4">
              <p className="text-sm text-gray-600 mb-2">{animal.description}</p>
              <p className="text-xs text-gray-400">
                Spotted on {animal.date} at Latitude: {animal.latitude}, Longitude: {animal.longitude}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}