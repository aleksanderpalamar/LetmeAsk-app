import {
  Avatar,
  Box,
  Button,  
  FormControl,
  Text,
  Textarea,
} from "@chakra-ui/react";
import Head from "next/head";
import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { Question } from "../../components/Question";
import { RoomCode } from "../../components/RoomCode";
import { useAuth } from "../../hooks/useAuth";
import { useRoom } from "../../hooks/useRoom";
import { database } from "../../services/firebase";
import { AiFillLike } from "react-icons/ai"

type RoomParams = {
  id: string;
}

export default function Rooms() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] =useState("");
  const roomId = params.id;
  
  const { title, questions } = useRoom(roomId);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

   if (newQuestion.trim() === "") {
      return;
   }
   
   if (!user) {
     throw new Error("Usuário não autenticado");
   }

   const question = {
     content: newQuestion,
     author: {
       name: user.name,
      avatar: user.avatar,
     },
     isHighlighted: false,
     isAnswered: false,
   };

   await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion("");
  }

  async function handleLikeQuestion(questionsId: string, likeId: string | undefined) {
    if (likeId) {
      await database.ref(`rooms/${roomId}/questions/${questionsId}/likes/${likeId}`).remove();
    } else {
      await database.ref(`rooms/${roomId}/questions/${questions}/likes`).push({
        authorId: user?.id,
      });
    }
  }

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
          fontFamily="sans-serif"
          color="purple.500"
          d="flex"
          fontSize={["3xl", "4xl"]}
        >
          Let
          <Text ml="2" mr="2">
            me
          </Text>
          <Text fontFamily="sans-serif" color="pink.500">
            Ask
          </Text>
        </Text>
        <RoomCode code={roomId}/>
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
          <Text as="h1" fontFamily="sans-serif" fontSize="2xl" color="purple.500">
            Sala:{title}
          </Text>
          {questions.length > 0 && <Text
            as="span"
            ml="16"
            p="8"
            color="gray.100"
            fontFamily="sans-serif"
            fontWeight="500"
            fontSize="14"
          >
            pergunta(s)
          </Text>}
        </Box>
        <FormControl onSubmit={handleSendQuestion}>
          <Textarea
            placeholder="Digite sua pergunta?"
            fontFamily="sans-serif"
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
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
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
           {user ? (
             <>
              <Box
              as="div"
              d="flex"
              flexDirection={["column", "row"]}
              alignItems="center"
            >
              <Avatar src={user.avatar} aria-label="" />
              <Text
                as="span"
                ml="2"
                color="purple.500"
                fontWeight="500"
                fontSize="16"
                fontFamily="sans-serif"
              >
                {user.name}
              </Text>
            </Box>            
             </>
           ) : (
             <>
             <Text as="span">Para enviar uma pergunta<Button ml="2" colorScheme="purple" borderRadius="full" fontFamily="sans-serif">faça seu login</Button></Text>
             </>
           )}             
           <Button
              type="submit"
              disabled={!user}
              colorScheme="purple"
              borderRadius="full"
              fontFamily="sans-serif"
            >
              Nova pergunta
            </Button> 
          </Box>
        </FormControl>
        <Box as="div">
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <Button type="button">
                    {question.likeCount > 0 && (
                      <Text as="span">{question.likeCount}</Text>
                    )}
                    <AiFillLike />
                  </Button>
                )}
              </Question>
            )
          })}
        </Box>
      </Box>
    </>
  );
}
