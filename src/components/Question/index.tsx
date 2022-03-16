import { ReactNode } from 'react';
import ClassName from 'classnames';
import { Box, Img, Text } from '@chakra-ui/react';

interface QuestionProps {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
};

export function Question({content, author, isAnswered = false, isHighlighted = false, children}: QuestionProps) {
  return (
    <>
    <Box as="div" className={ClassName(
      'question',
      { answered: isAnswered },
      { highlighted: isHighlighted && !isAnswered },
    )}>
    <Text as="p">{content}</Text>  
      <Box as="footer">
        <Box as="div">
          <Img src={author.avatar} aria-label={author.name}/>
          <Text as="span">{author.name}</Text>
        </Box>
      </Box>
    </Box>
    </>
  )
}