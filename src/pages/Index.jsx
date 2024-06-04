import { Container, Input, SimpleGrid, Box, Heading, VStack, Image, Text, Select, HStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [agePeriod, setAgePeriod] = useState("");
  const [sizeRange, setSizeRange] = useState("");
  const [selectedDoor, setSelectedDoor] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const doors = [
    { id: 1, name: "Victorian Door", image: "/images/victorian-door.jpg", description: "A beautiful Victorian-era door.", agePeriod: "victorian", sizeRange: "large", detailedDescription: "This Victorian door is crafted from the finest oak and features intricate carvings that are typical of the era. It has been restored to its original glory and is perfect for any historical renovation project." },
    { id: 2, name: "Modern Door", image: "/images/modern-door.jpg", description: "A sleek modern door.", agePeriod: "modern", sizeRange: "medium", detailedDescription: "This modern door boasts a minimalist design with clean lines and a smooth finish. It is made from high-quality materials and is designed to complement contemporary interiors." },
    { id: 3, name: "Rustic Door", image: "/images/rustic-door.jpg", description: "A charming rustic door.", agePeriod: "rustic", sizeRange: "small", detailedDescription: "This rustic door is made from reclaimed wood and features a weathered finish that adds character and charm. It is ideal for cottages, cabins, and other rustic settings." },
    // Add more door objects as needed
  ];

  const filteredDoors = doors.filter(door => {
    return (
      door.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (agePeriod === "" || door.agePeriod === agePeriod) &&
      (sizeRange === "" || door.sizeRange === sizeRange)
    );
  });

  const handleDoorClick = (door) => {
    setSelectedDoor(door);
    onOpen();
  };

  return (
    <Container maxW="container.xl" p={4}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign="center" mt={8}>
          Architectural Parts Broker
        </Heading>
        <Input
          placeholder="Search for doors..."
          size="lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <HStack spacing={4} w="full">
          <Select placeholder="Select Age Period" size="lg" value={agePeriod} onChange={(e) => setAgePeriod(e.target.value)}>
            <option value="victorian">Victorian</option>
            <option value="modern">Modern</option>
            <option value="rustic">Rustic</option>
            {/* Add more options as needed */}
          </Select>
          <Select placeholder="Select Size Range" size="lg" value={sizeRange} onChange={(e) => setSizeRange(e.target.value)}>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            {/* Add more options as needed */}
          </Select>
        </HStack>
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
          {filteredDoors.map(door => (
            <Box key={door.id} borderWidth="1px" borderRadius="lg" overflow="hidden" onClick={() => handleDoorClick(door)} cursor="pointer">
              <Image src={door.image} alt={door.name} />
              <Box p={6}>
                <Heading as="h3" size="lg">{door.name}</Heading>
                <Text mt={4}>{door.description}</Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>

      {selectedDoor && (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedDoor.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image src={selectedDoor.image} alt={selectedDoor.name} mb={4} />
              <Text>{selectedDoor.detailedDescription}</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default Index;