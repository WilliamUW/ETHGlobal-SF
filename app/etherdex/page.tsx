import { Card, CardContent, CardHeader } from "@/components/ui/card"

const animals = [
  { id: 1, name: 'Moo Deng', species: 'Pygmy Hippopotamus', location: 'Khao Kheow Open Zoo', date: '2024-10-2', description: 'A cute Pygmy Hippopotamus spotted in the wild!', image: 'https://images.prestigeonline.com/wp-content/uploads/sites/6/2024/09/26220054/459118063_539597145247047_8853740358288590339_n.jpeg' },
  { id: 2, name: 'Pesto', species: 'King Penguin', location: 'Sea Life Melbourne Aquarium', date: '2024-09-10', description: 'A beautiful King Penguin spotted at the Sea Life Melbourne Aquarium!', image: 'https://www.pedestrian.tv/wp-content/uploads/2024/09/Pesto-Gender-Reveal.jpg?quality=75&w=1024' },
  { id: 3, name: 'Spots', species: 'Leopard', location: 'African Savanna', date: '2024-08-05', description: 'A majestic leopard lounging on a tree.', image: 'https://anthropocenemagazine.org/wp-content/uploads/2018/03/leopard2.jpg' },
  { id: 4, name: 'Fluffy', species: 'Arctic Fox', location: 'Tundra', date: '2024-05-30', description: 'An adorable arctic fox with its winter coat.', image: 'https://i.redd.it/8y9uiabj84r21.jpg' },
]

export default function EtherDex() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center text-white animate-pulse">Your EtherDex</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {animals.map((animal) => (
          <Card key={animal.id} className="bg-white border-4 border-yellow-400 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
            <CardHeader className="p-4">
              <h2 className="text-xl font-bold text-purple-600">{animal.name}</h2>
              <p className="text-sm text-gray-500">{animal.species}</p>
            </CardHeader>
            <img src={animal.image} alt={animal.name} width={200} height={200} className="w-full h-48 object-cover" />
            <CardContent className="p-4">
              <p className="text-sm text-gray-600 mb-2">{animal.description}</p>
              <p className="text-xs text-gray-400">Spotted on {animal.date} at {animal.location}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}