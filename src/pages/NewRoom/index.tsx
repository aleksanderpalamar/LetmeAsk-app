/* eslint-disable jsx-a11y/alt-text */
import {
  Box,
  Container,
  Divider,
  Heading,
  HStack,
  Img,  
  Stack,
  useBreakpointValue,
  Text,
  useColorModeValue,
  Input,
  Button,
  Avatar,
  FormControl,    
} from "@chakra-ui/react";

import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function NewRoom() {
  const { user } = useAuth();
  const router = useRouter();
  const [newRoom, setNewRoom] = useState("");
  const [roomCode, setRoomCode] = useState("");
  
  //create a new room
  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === "") {
      return;
    }

    const roomRef = database.ref("rooms");

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    router.push(`/admin/rooms/${firebaseRoom.key}`);
  }

  //join a room
  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert("A sala não existe, verifique o código.");
      return;
    }

    if (roomRef.val().endedAt) {
      alert("A sala já foi finalizada.");
      return;
    }

    router.push(`/rooms/${roomCode}`);
  }

  return (
    <>
      <Head>
        <title>Let me Ask | </title>
      </Head>
      <Container
        maxW="lg"
        py={{ base: "12", md: "24" }}
        px={{ base: "0", sm: "8" }}
      >
        <Stack spacing="8">
          <Stack spacing="6">
            <Img src="/assets/images/illustration.svg" />
            <Stack
              spacing={{ base: "2", md: "3" }}
              textAlign="center"
              alignItems="center"
            >              
              <Heading size={useBreakpointValue({ base: "md", md: "lg" })}>
                Criar uma nova sala
              </Heading>
              <HStack spacing="1" justify="center">
                <Avatar name={user?.name} src={user?.avatar} border="3px solid #f5f5f5" aria-label="Picture user"/>                
                <Text color="muted">{user?.name}</Text>
              </HStack>
              <Button
                variant="solid"
                colorScheme="purple"
                size="md"
                w="20"
                rounded="full"
                onClick={() => signOut({callbackUrl: "/"})}
              >
                Logout
              </Button>
            </Stack>
          </Stack>
          <Box
            py={{ base: "0", sm: "8" }}
            px={{ base: "4", sm: "10" }}
            bg={useBreakpointValue({ base: "transparent", sm: "bg-surface" })}
            boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <Stack spacing="6">
              <Stack spacing="6">
                <FormControl onSubmit={handleCreateRoom}>
                <Input 
                  placeholder="Nome da sala"
                  onChange={(event) => setNewRoom(event.target.value)}
                  value={newRoom} 
                  size="md" 
                  variant="flushed"
                />
                <Button
                  variant="solid"
                  type="submit"
                  colorScheme="purple"
                  size="lg"
                  rounded="full"
                  mt="4"                                  
                >                  
                  Criar sala
                </Button>
                </FormControl>
                <HStack>
                  <Divider />
                  <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                    ou entre em uma sala
                  </Text>
                  <Divider />
                </HStack>
                <FormControl onSubmit={handleJoinRoom}>
                <Input
                  placeholder="Digite o código da sala"
                  onChange={(event) => setRoomCode(event.target.value)}
                  value={roomCode}
                  variant="flushed"
                  size="md"
                />
                <Button
                  variant="solid"
                  colorScheme="purple"
                  size="lg"
                  rounded="full"
                  mt="4"                                    
                >
                  {" "}
                  Entrar na sala
                </Button>
                </FormControl>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </>
  );
}
