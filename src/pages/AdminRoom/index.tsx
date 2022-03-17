import Head from "next/head";

import { Avatar, Box, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useParams } from "react-router-dom";
import { useRoom } from "../../hooks/useRoom";
import { database } from "../../services/firebase";
import { signOut, useSession } from "next-auth/react";
import { Question } from "../../components/Question";
import { RiCheckFill, RiQuestionAnswerFill, RiDeleteBin5Fill } from "react-icons/ri";

type RoomParams = {
  id: string;
}

export default function AdminRoom() {
  const { data: session } = useSession();
  const history = useRouter();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  
  const { title, questions } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endeAt: new Date().toISOString(),
    });

    history.push("/");
  }

  async function handleSendQuestion() {
    history.push(`/rooms/${roomId}`);
  }

  // Function marks response as read
  async function handleCheckIn(questionsId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionsId}`).update({
      isAnswered: true,
    });
  }

  // Function marks response as highlight
  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  // Function delete question
  async function handleDeleteQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
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
          <Text fontFamily="sans-serif" color="purple.500" d="flex" fontSize={["3xl", "4xl"]}>Let
          <Text ml="2" mr="2">me</Text> 
          <Text fontFamily="sans-serif" color="pink.500">Ask</Text>
          </Text>
          <Button onClick={handleSendQuestion} as="a" size="lg" mt={["8", "0"]} mb={["4", "0"]} borderRadius="3xl" fontWeight="500" colorScheme="purple" p="0 32" d="flex" justifyContent="center" alignItems="center">Modo Usuário</Button>
          <Button onClick={handleEndRoom} size="lg" mb={["8", "0"]} borderRadius="3xl" fontWeight="500" colorScheme="purple" p="0 32" d="flex" justifyContent="center" alignItems="center">Encerrar sala</Button>
          <Text as="span" d="flex" gap="16" ml="4" fontFamily="sans-serif">
            {roomId}
          </Text>
          <Avatar mt={["8", "0"]} src={session?.user?.image} aria-label="Picture User" cursor="pointer" onClick={() => signOut({callbackUrl: "/"})}/>
        </Box>
        <Box as="main">
          <Box as="div" w="90%" maxW="980" m="32" d="flex" justifyContent="space-between" alignItems="center">
            <Text as="h1" fontFamily="sans-serif" fontSize="1.5rem" color="purple.500">Painel Administrativo: Sala {title}</Text>
            {questions.length > 0 && <Text as="span" ml="16" fontFamily="sans-serif" fontWeight="500" fontSize="14">pergunta(s)</Text>}
          </Box>
          <Box as="div" w="90%" maxW="980" mt="32">
            {questions.map((question) => {
              return (
                <Question
                  key={question.id}
                  content={question.content}
                  author={question.author}
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                >
                  {question.isAnswered && (
                    <>
                      <Button type="button" onClick={() => handleCheckIn(question.id)}>
                        <RiCheckFill size="1.5rem" />
                      </Button>
                      <Button type="button" onClick={() => handleHighlightQuestion(question.id)}>
                        <RiQuestionAnswerFill size="1.5rem" />
                      </Button>
                    </>
                  )}
                  <Button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                    <RiDeleteBin5Fill size="1.5rem" />
                  </Button>
                </Question>
              )
            })}
          </Box>
        </Box>        
    </>
  )
}