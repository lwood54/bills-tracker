import { Text } from "@chakra-ui/react";
import type { Bill } from "@prisma/client";
import * as React from "react";
import Paydown from "../Paydown";

interface BillsListProps {
  children?: React.ReactNode;
  billsList: Bill[];
}
const BillsList: React.FC<BillsListProps> = ({ billsList }) => {
  return (
    <>
      {billsList.map((bill) => (
        <div key={bill.id}>
          <Text>{bill.title}</Text>
          <Paydown bill={bill} />
        </div>
      ))}
    </>
  );
};

export default BillsList;
