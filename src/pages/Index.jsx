import { Container, Input, SimpleGrid, Box, Heading, VStack, Image, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from "@chakra-ui/react";
import { useState } from "react";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoor, setSelectedDoor] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const doors = [
    { id: 1, name: "Victorian Door", image: "/images/victorian-door.jpg", description: "A beautiful Victorian-era door." },
    { id: 2, name: "Modern Door", image: "/images/modern-door.jpg", description: "A sleek modern door." },
    { id: 3, name: "Rustic Door", image: "/images/rustic-door.jpg", description: "A charming rustic door." },
    // Add more door objects as needed
  ];

  const filteredDoors = doors.filter(door =>
    door.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedDoor?.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image src={selectedDoor?.image} alt={selectedDoor?.name} mb={4} />
              <Text>{selectedDoor?.description}</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Container>
  );
};

export default Index;