import { Box } from "@chakra-ui/react";
import * as React from "react";

interface BackgroundContainerProps {
  children?: React.ReactNode;
  p?: string;
}

const BackgroundContainer: React.FC<BackgroundContainerProps> = ({
  children,
  p = "4",
  ...rest
}) => {
  const bgRef = React.useRef({} as HTMLDivElement);

  return (
    <Box
      ref={bgRef}
      p={p}
      pb="125"
      {...rest}
      data-testid="background-container"
      w="100%"
      overflowY="auto"
      h="100%"
    >
      {children}
    </Box>
  );
};

BackgroundContainer.displayName = "BackgroundContainer";

export default BackgroundContainer;
