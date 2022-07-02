import { Box } from "@chakra-ui/react";
import * as React from "react";

interface BackgroundContainerProps {
  children?: React.ReactNode;
}
const BackgroundContainer: React.FC<BackgroundContainerProps> = ({
  children,
}) => {
  return (
    <Box w="100%" h="100vh" bgGradient="linear(to-t, #9DECF9, #2C7A7B)">
      {children}
    </Box>
  );
};

export default BackgroundContainer;
