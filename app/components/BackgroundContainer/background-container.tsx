import { Box } from "@chakra-ui/react";
import * as React from "react";
import useResize from "~/hooks/use-resize";

interface BackgroundContainerProps {
  children?: React.ReactNode;
  p?: string;
}

const BackgroundContainer: React.FC<BackgroundContainerProps> = ({
  children,
  ...rest
}) => {
  const bgRef = React.useRef({} as HTMLDivElement);
  const { height } = useResize(bgRef);
  const [windowHeight, setWindowHeight] = React.useState(0);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowHeight(window.innerHeight);
    }
  }, [height]);

  const getHeight = (wh: number) => (wh > 500 ? "calc(100vh - 72px)" : "100%");

  return (
    <Box
      ref={bgRef}
      {...rest}
      data-testid="background-container"
      w="100%"
      h={getHeight(windowHeight)}
      bgGradient="linear(to-t, #9DECF9, #2C7A7B)"
    >
      {children}
    </Box>
  );
};

BackgroundContainer.displayName = "BackgroundContainer";

export default BackgroundContainer;
