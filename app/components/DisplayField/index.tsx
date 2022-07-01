import { Stack, Text } from "@chakra-ui/react";
import * as React from "react";

interface NewComponentProps {
  children?: React.ReactNode;
  label: string;
}
const NewComponent: React.FC<NewComponentProps> = ({ children, label }) => {
  return (
    <Stack spacing="0" w="full">
      <Text fontWeight="semibold" fontSize="s">
        {label}
      </Text>
      <Text fontSize="lg" fontWeight="semibold">
        {children}
      </Text>
    </Stack>
  );
};

export default NewComponent;
