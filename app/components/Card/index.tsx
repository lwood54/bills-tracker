import { Container } from "@chakra-ui/react";
import * as React from "react";

interface CardProps {
  children?: React.ReactNode;
  p?: "2" | "4" | "6";
  boxShadow?: "md" | "lg";
  maxWidth?: number;
}
const Card: React.FC<CardProps> = ({
  boxShadow = "lg",
  children,
  p = "4",
  maxWidth,
}) => {
  return (
    <Container
      p={p}
      boxShadow={boxShadow}
      maxWidth={maxWidth}
      border="1px"
      borderColor="gray.200"
    >
      {children}
    </Container>
  );
};

export default Card;
