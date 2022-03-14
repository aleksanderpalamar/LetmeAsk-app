import Head from "next/head";

import { Avatar, Box, Button, Text } from "@chakra-ui/react";
//import { useRouter } from "next/router";

export default function AdminRoom() {
  //const history = useRouter();  

  return (
    <>  
        <Head>
            <title>Let me Ask | {}</title>
        </Head> 
        <Box
          as="header"
          p="24"
          borderBottom="1px solid #646478"
          maxW="100%"
          m="0 auto"
          d="flex"
          flexDirection={["column", "row"]}          
          justifyContent="space-between"
          alignItems="center"
        >          
          <Text fontFamily="Poppins" color="purple.500" d="flex" fontSize={["3xl", "4xl"]}>Let
          <Text ml="2" mr="2">me</Text> 
          <Text fontFamily="Poppins" color="pink.500">Ask</Text>
          </Text>
          <Button as="a" href="/Rooms" size="lg" mt={["8", "0"]} mb={["4", "0"]} borderRadius="3xl" fontWeight="500" colorScheme="purple" p="0 32" d="flex" justifyContent="center" alignItems="center">Modo Usuário</Button>
          <Button size="lg" mb={["8", "0"]} borderRadius="3xl" fontWeight="500" colorScheme="purple" p="0 32" d="flex" justifyContent="center" alignItems="center">Encerrar sala</Button>
          <Text as="span" d="flex" gap="16" ml="4" fontFamily="Poppins">
            Room Code
          </Text>
          <Avatar mt={["8", "0"]} src="" aria-label="Usuário"/>
        </Box>
        <Box as="main">
          <Box as="div" w="90%" maxW="980" m="32" d="flex" justifyContent="space-between" alignItems="center">
            <Text as="h1" fontFamily="Poppins" fontSize="1.5rem" color="purple.500">Painel Administrativo: Sala:</Text>
            <Text as="span" ml="16" fontFamily="Poppins" fontWeight="500" fontSize="14">pergunta(s)</Text>
          </Box>
          <Box as="div" w="90%" maxW="980" mt="32">

          </Box>
        </Box>        
    </>
  )
}