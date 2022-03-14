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
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";

export default function NewRoom() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Let me Ask | NewRoom</title>
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
                <Avatar
                  size="md"
                  name={session?.user?.name}
                  src={session?.user?.image}
                  border="3px solid #04D361"
                />
                <Text color="muted">{session?.user?.name}</Text>
              </HStack>
              <Button
                variant="solid"
                colorScheme="purple"
                size="lg"
                w="20"
                rounded="full"
                onClick={() => signOut()}
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
                <Input placeholder="Nome da sala" size="md" variant="flushed" />
                <Button
                  variant="solid"
                  colorScheme="purple"
                  size="lg"
                  rounded="full"
                >
                  {" "}
                  Criar sala
                </Button>
                <HStack>
                  <Divider />
                  <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                    ou entre em uma sala
                  </Text>
                  <Divider />
                </HStack>
                <Input
                  placeholder="Digite o código da sala"
                  variant="flushed"
                  size="md"
                />
                <Button
                  variant="solid"
                  colorScheme="purple"
                  size="lg"
                  rounded="full"
                >
                  {" "}
                  Entrar na sala
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </>
  );
}
