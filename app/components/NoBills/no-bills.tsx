import * as React from "react";
import { Box, IconButton, Stack, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useNavigate } from "@remix-run/react";
import { urlPath } from "~/constants/url-paths";
import Card from "../Card";

interface NoBillsProps {
  children?: React.ReactNode;
}
const NoBills: React.FC<NoBillsProps> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <Stack direction="row" justifyContent="space-between">
        <Stack>
          <Text>You don't currently have any bills setup to monitor.</Text>
          <Text>Would you like to add a bill?</Text>
        </Stack>
        <Box display="flex" justifyContent="flex-end">
          <IconButton
            aria-label="Search database"
            icon={<AddIcon />}
            borderRadius="full"
            bgColor="teal.600"
            color="white"
            onClick={() => navigate(urlPath.BILLS_ADD)}
          />
        </Box>
      </Stack>
    </Card>
  );
};

export default NoBills;
