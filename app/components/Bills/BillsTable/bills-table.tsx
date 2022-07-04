import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Tfoot,
} from "@chakra-ui/react";
import type { Bill } from "@prisma/client";
import { useNavigate } from "@remix-run/react";
import * as React from "react";
import { urlPath } from "~/constants/url-paths";
import { Paydown } from "../Paydown";

interface BillsTableProps {
  children?: React.ReactNode;
  billsList: Bill[];
}
const BillsTable: React.FC<BillsTableProps> = ({ billsList }) => {
  const navigate = useNavigate();

  const handleRowClick = (
    id: string,
    isClick = true,
    e?: React.KeyboardEvent<HTMLTableRowElement>
  ) => {
    if (e?.key === "Enter" || isClick) {
      navigate(`../${urlPath.BILLS}/${id}`);
    }
  };

  return (
    <TableContainer>
      <Table>
        <TableCaption textAlign="left">
          Paydown progress for your bills
        </TableCaption>
        <Thead>
          <Tr>
            <Th borderColor="teal.600">Bill</Th>
            <Th borderColor="teal.600" textAlign="center">
              Progress
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {billsList.map((bill, i) => (
            <Tr
              tabIndex={0}
              onKeyPress={(e) => handleRowClick(bill.id, false, e)}
              bg={i % 2 === 0 ? "cyan.800" : ""}
              key={bill.id}
              cursor="pointer"
              onClick={() => handleRowClick(bill.id)}
              _hover={{ bg: "cyan.300" }}
              _active={{ bg: "cyan.400" }}
              _focus={{ bg: "cyan.300" }}
            >
              <Td width={225} borderColor="teal.600">
                <Text fontWeight="bold" maxW={225} noOfLines={1} color="white">
                  {bill.title}
                </Text>
              </Td>
              <Td borderColor="teal.600">
                <Paydown bill={bill} />
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Bill</Th>
            <Th textAlign="center">Progress</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default BillsTable;
