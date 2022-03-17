import { Box, Button, Img, Text } from "@chakra-ui/react";

type RoomCodeProps = {
  code: string | undefined;
}

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText("props.code");
  }

  return (
    <Box as="div">
      <Button as="div" colorScheme="purple" borderRadius="full" onClick={copyRoomCodeToClipboard}>
        <Img src="../assets/images/copy.svg" mr="2" aria-label="Copiar código da sala"/>
        <Text as="span" fontFamily="sans-serif"><Text as="strong"></Text>{props.code}</Text>
      </Button>
    </Box>
  )
}
