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
import Paydown from "../Paydown";

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
      navigate(`${id}`);
    }
  };

  return (
    <TableContainer>
      <Table>
        <TableCaption textAlign="left">
          Paydown display for your bills.
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Bill</Th>
            <Th textAlign="center">Progress</Th>
          </Tr>
        </Thead>
        <Tbody>
          {billsList.map((bill, i) => (
            <Tr
              tabIndex={0}
              onKeyPress={(e) => handleRowClick(bill.id, false, e)}
              bg={i % 2 === 0 ? "cyan.200" : ""}
              key={bill.id}
              cursor="pointer"
              onClick={() => handleRowClick(bill.id)}
              _hover={{ bg: "teal.100" }}
              _active={{ bg: "teal.200" }}
              _focus={{ bg: "teal.200" }}
            >
              <Td width={225}>
                <Text fontWeight="bold" maxW={225} noOfLines={1}>
                  {bill.title}
                </Text>
              </Td>
              <Td>
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
