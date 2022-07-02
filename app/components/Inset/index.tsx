import { Box } from "@chakra-ui/react";
import * as React from "react";

interface InsetProps {
  children?: React.ReactNode;
  p?: string;
  m?: string;
}
const Inset: React.FC<InsetProps> = ({ children, m, p = "4" }) => {
  return (
    <Box p={p} m={m}>
      {children}
    </Box>
  );
};

export default Inset;
