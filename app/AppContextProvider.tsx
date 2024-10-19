"use client"

import React, { createContext, useContext, useState, ReactNode } from "react";

interface AppContextProviderProps {
  children: ReactNode; // This defines the type of children
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [animals, setAnimals] = useState([
    {
      id: 2,
      name: "Pesto",
      species: "King Penguin",
      location: "Sea Life Melbourne Aquarium",
      date: "2024-09-10",
      description:
        "A beautiful King Penguin spotted at the Sea Life Melbourne Aquarium!",
      image:
        "https://www.pedestrian.tv/wp-content/uploads/2024/09/Pesto-Gender-Reveal.jpg?quality=75&w=1024",
        latitude: "40.7468733",
        longitude: "-73.9947449",
    },
    {
      id: 3,
      name: "Spots",
      species: "Leopard",
      date: "2024-08-05",
      description: "A majestic leopard lounging on a tree.",
      image:
        "https://anthropocenemagazine.org/wp-content/uploads/2018/03/leopard2.jpg",
        latitude: "40.7468733",
        longitude: "-73.9947449",
    },
    {
      id: 1,
      name: "Fluffy",
      species: "Arctic Fox",
      date: "2024-05-30",
      description: "An adorable arctic fox with its winter coat.",
      image: "https://i.redd.it/8y9uiabj84r21.jpg",
      latitude: "40.7468733",
      longitude: "-73.9947449",
    },
  ]);

  return (
    <AppContext.Provider value={{ animals, setAnimals }}>
      {children}
    </AppContext.Provider>
  );
};

// Define the type for each animal entry
export interface Animal {
  id: number;
  name: string;
  species: string;
  date: string;
  description: string;
  image: string;
  latitude: string,
  longitude: string,
}

// Define the context value type
interface AppContextType {
  animals: Animal[];
  setAnimals: React.Dispatch<React.SetStateAction<Animal[]>>;
}

// Initialize context with null and then cast it
const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }
  return context;
};
