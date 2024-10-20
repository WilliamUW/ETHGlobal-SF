"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Profile() {
  return (
    <div className="container mx-auto p-4 bg-red-600 min-h-screen">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center text-white"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Your Etherdex Profile
      </motion.h1>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-white border-8 border-yellow-400 rounded-3xl shadow-lg overflow-hidden">
          <CardHeader className="p-6 text-center bg-red-500">
            <motion.img
              src="https://media.licdn.com/dms/image/v2/D5603AQG5efoV2B-P8Q/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1674067603082?e=1733356800&v=beta&t=KBy_a7n2ss4HXhUensd8bDGKrmkQ-AWWdCoVzhVYVFI"
              alt="Profile"
              width={120}
              height={120}
              className="rounded-full mx-auto mb-4 border-4 border-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
            <h2 className="text-3xl font-bold text-white">William Wang</h2>
            <p className="text-sm text-yellow-300">bwilliamwang@gmail.com</p>
            <p className="text-sm text-white mt-2">
              Ethermon Master in Training
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <motion.div
              className="mb-6"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl font-semibold text-red-600 mb-3">
                Trainer Stats
              </h3>
              <p className="text-lg text-gray-700">Ethermon Captured: 42</p>
              <p className="text-lg text-gray-700">Legendary Sightings: 7</p>
              <p className="text-lg text-gray-700">Exploration Points: 1337</p>
            </motion.div>
            <motion.div
              className="mb-6"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-2xl font-semibold text-red-600 mb-3">
                Achievements
              </h3>
              <ul className="list-disc list-inside text-lg text-gray-700">
                <li>Master Photographer</li>
                <li>San Francisco Explorer</li>
                <li>Rare Ethermon Finder</li>
              </ul>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-full transition-all duration-300">
                Edit Trainer Profile
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
