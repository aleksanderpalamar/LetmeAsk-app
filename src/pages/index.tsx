import { Box, Button, Container, Divider, Heading, HStack, Img, Stack, Text, useBreakpointValue, useColorModeValue } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head';
import { useRouter } from 'next/router';

import { GoogleIcon, TwitterIcon } from '../components/ProviderIcons/'
import { useAuth } from '../hooks/useAuth';

const Home: NextPage = () => {
  const router = useRouter();
  const { user, singInWithGoogle, singInWithTwitter } = useAuth();

  // Authenticate with Google
  function handleCreateRoomGoogle() {
    if (!user) {
      singInWithGoogle();
    }

    router.push("/rooms/new");
  }

  // Authenticate with Twitter
  function handleCreateRoomTwitter() {
    if (!user) {
      singInWithTwitter();
    }

    router.push("/rooms/new");
  }
  
  return (
    <>
    <Head>
      <title>Let me Ask</title>
    </Head>    
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Img src="/assets/images/illustration.svg" />
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={useBreakpointValue({ base: "md", md: "lg" })}>
              Crie salas de Q&A ao-vivo
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Tire as suas duvidas em tempo real</Text>
            </HStack>
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
              <HStack>
                <Divider />
                <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                  Social Login
                </Text>
                <Divider />
              </HStack>
              <HStack justifyContent="space-around" >
              <Button                
                variant="solid"
                colorScheme="purple"
                size="lg"
                w="20"                
                rounded="full"
                onClick={handleCreateRoomGoogle}
              >
                <GoogleIcon boxSize="8" />
              </Button>              
              <Button                
                variant="solid"
                colorScheme="purple"
                size="lg"
                w="20"                
                rounded="full"
                onClick={handleCreateRoomTwitter}
              >
                <TwitterIcon boxSize="8"/>
              </Button>              
              </HStack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>    
   </>
  )
}

export default Home