import { Box, Button, Img, Text } from "@chakra-ui/react";

interface RoomCodeProps {
  code: string;
}

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
  }

  return (
    <Box as="div">
      <Button as="div" onClick={copyRoomCodeToClipboard}>
        <Img src="../assets/images/copy.svg" aria-label="Copiar código da sala"/>
        <Text as="span"><Text as="strong">Sala:</Text> #{props.code}</Text>
      </Button>
    </Box>
  )
}
