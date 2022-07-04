import { Box, Stack, Text } from "@chakra-ui/react";
import type { Bill } from "@prisma/client";
import { useNavigate } from "@remix-run/react";
import * as React from "react";
import { urlPath } from "~/constants/url-paths";
import { Paydown } from "../Paydown";

interface BillsListProps {
  children?: React.ReactNode;
  billsList: Bill[];
}
const BillsList: React.FC<BillsListProps> = ({ billsList }) => {
  const navigate = useNavigate();

  const handleRowClick = (
    id: string,
    isClick = true,
    e?: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (e?.key === "Enter" || isClick) {
      navigate(`../${urlPath.BILLS}/${id}`);
    }
  };

  return (
    <Stack direction="column" spacing="0">
      {billsList.map((bill, i) => (
        <Box
          tabIndex={0}
          key={bill.id}
          onKeyPress={(e) => handleRowClick(bill.id, false, e)}
          bg={i % 2 === 0 ? "cyan.800" : ""}
          _hover={{ bg: "teal.100" }}
          _active={{ bg: "teal.200" }}
          _focus={{ bg: "teal.200" }}
          p="4"
          cursor="pointer"
          onClick={() => handleRowClick(bill.id)}
        >
          <Text fontWeight="semibold" color="white">
            {bill.title}
          </Text>
          <Paydown bill={bill} />
        </Box>
      ))}
    </Stack>
  );
};

export default BillsList;
