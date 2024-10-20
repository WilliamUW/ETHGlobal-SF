"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useAppContext } from "../AppContextProvider";
import { motion } from "framer-motion";

export default function EtherDex() {
  const { animals } = useAppContext();

  return (
    <div className="container mx-auto p-4 bg-red-600 min-h-screen">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center text-white"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Your EtherDex
      </motion.h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {animals.map((animal, index) => (
          <motion.div
            key={animal.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card
              className="bg-white border-8 border-yellow-400 rounded-3xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
            >
              <CardHeader className="p-4 bg-red-500">
                <h2 className="text-2xl font-bold text-white">{animal.species}</h2>
              </CardHeader>
              <motion.img
                src={animal.image}
                alt={animal.name}
                width={200}
                height={200}
                className="w-full h-48 object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              <CardContent className="p-4">
                <p className="text-md text-gray-700 mb-2">{animal.description}</p>
                <p className="text-sm text-red-600">
                  Spotted on {animal.date} at Location: {animal.latitude}, {animal.longitude}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}