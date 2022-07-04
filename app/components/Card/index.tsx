import { Container } from "@chakra-ui/react";
import * as React from "react";

interface CardProps {
  children?: React.ReactNode;
  p?: string;
  // m?: string;
  boxShadow?: "md" | "lg";
  maxWidth?: number;
}
const Card: React.FC<CardProps> = ({
  boxShadow = "lg",
  children,
  p = "4",
  // m = 0,
  maxWidth,
}) => {
  return (
    <Container
      p={p}
      boxShadow={boxShadow}
      maxWidth={maxWidth}
      bg="rgba(119, 222, 247, .5)"
      border="1px"
      borderColor="teal.600"
      color="white"
    >
      {children}
    </Container>
  );
};

export default Card;
