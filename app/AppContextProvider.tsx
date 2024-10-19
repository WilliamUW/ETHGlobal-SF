"use client"

import { createContext, useContext, useState } from 'react';

// Define the context and its type
const AppContext = createContext(null);

// Custom hook to use the AppContext
export const useAppContext = () => {
  return useContext(AppContext);
};

// AppContextProvider component to wrap the app and provide state
export const AppContextProvider = ({ children }) => {
  const [animals, setAnimals] = useState([
    { id: 2, name: 'Pesto', species: 'King Penguin', location: 'Sea Life Melbourne Aquarium', date: '2024-09-10', description: 'A beautiful King Penguin spotted at the Sea Life Melbourne Aquarium!', image: 'https://www.pedestrian.tv/wp-content/uploads/2024/09/Pesto-Gender-Reveal.jpg?quality=75&w=1024' },
    { id: 3, name: 'Spots', species: 'Leopard', location: 'African Savanna', date: '2024-08-05', description: 'A majestic leopard lounging on a tree.', image: 'https://anthropocenemagazine.org/wp-content/uploads/2018/03/leopard2.jpg' },
    { id: 4, name: 'Fluffy', species: 'Arctic Fox', location: 'Tundra', date: '2024-05-30', description: 'An adorable arctic fox with its winter coat.', image: 'https://i.redd.it/8y9uiabj84r21.jpg' },
  ]);

  // Provide the state and the setter function to children
  return (
    <AppContext.Provider value={{ animals, setAnimals }}>
      {children}
    </AppContext.Provider>
  );
};
