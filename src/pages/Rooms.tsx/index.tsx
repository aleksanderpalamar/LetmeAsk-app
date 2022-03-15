import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  Text,
  Textarea,
} from "@chakra-ui/react";
import Head from "next/head";

export default function Rooms() {
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
        {/*<Img maxH="54" src="/assets/images/logo.svg" />*/}
        <Text
          fontFamily="Poppins"
          color="purple.500"
          d="flex"
          fontSize={["3xl", "4xl"]}
        >
          Let
          <Text ml="2" mr="2">
            me
          </Text>
          <Text fontFamily="Poppins" color="pink.500">
            Ask
          </Text>
        </Text>
        <Text
          as="span"
          mt={["8", "0"]}
          d="flex"
          gap="16"
          ml="4"
          fontFamily="Poppins"
        >
          Room Code
        </Text>
        <Avatar mt={["8", "0"]} src="" aria-label="Usuário" />
      </Box>
      <Box as="main" maxW="980" w="90%" m="0 auto">
        <Box
          as="div"
          w="100%"
          maxW="980"
          m="22"
          d="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text as="h1" fontFamily="Poppins" fontSize="2xl" color="purple.500">
            Sala:{" "}
          </Text>
          <Text
            as="span"
            ml="16"
            p="8"
            color="gray.100"
            fontFamily="Poppins"
            fontWeight="500"
            fontSize="14"
          >
            pergunta(s)
          </Text>
        </Box>
        <FormControl>
          <Textarea
            placeholder="Digite sua pergunta?"
            fontFamily="Poppins"
            w="100%"
            maxW="980"
            color="gray.950"
            bg="gray.100"
            size="sm"
            borderRadius="8"
            border="0"
            p="16"
            boxShadow="0 2px 2px rgbs (0, 0, 0, 0.04)"
            minH="130"
          />
          <Box
            as="div"
            w="100%"
            maxW="980"
            d="flex"
            justifyContent="space-between"
            alignItems="center"
            mt="16"
          >
            <Box
              as="div"
              d="flex"
              flexDirection={["column", "row"]}
              alignItems="center"
            >
              <Avatar src="" aria-label="" />
              <Text
                as="span"
                ml="2"
                color="purple.500"
                fontWeight="500"
                fontSize="16"
                fontFamily="Poppins"
              >
                Palamar
              </Text>
            </Box>
            <Button
              type="submit"
              colorScheme="purple"
              borderRadius="full"
              fontFamily="Poppins"
            >
              Nova pergunta
            </Button>
          </Box>
        </FormControl>
      </Box>
    </>
  );
}
