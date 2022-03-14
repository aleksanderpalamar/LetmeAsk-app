import { Box, Button, Container, Divider, Heading, HStack, Img, Stack, Text, useBreakpointValue, useColorModeValue } from '@chakra-ui/react'
import type { GetServerSideProps, NextPage } from 'next'
import { getSession, signIn } from 'next-auth/react'
import { GitHubIcon, GoogleIcon, TwitterIcon } from '../components/ProviderIcons/'

const Home: NextPage = () => {
  function handleSignIn() {
    signIn("github");
  }
  return (
    <>
    <>
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
              >
                <GoogleIcon boxSize="8" />
              </Button>              
              <Button                
                variant="solid"
                colorScheme="purple"
                size="lg"
                w="20"                
                rounded="full"
              >
                <TwitterIcon boxSize="8" />
              </Button>
              <Button
                onClick={handleSignIn}                
                variant="solid"
                colorScheme="purple"
                size="lg"
                w="20"                
                rounded="full"
              >
                <GitHubIcon boxSize="8" />
              </Button>
              </HStack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>    
   </>    
    </>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })  

  if (session) {
    return {
      redirect: {
        destination: '/NewRoom',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}
