import { Box, Container, HStack, Stack, Text } from "@chakra-ui/react";
import type { Bill } from "@prisma/client";
import * as React from "react";
import DisplayField from "~/components/DisplayField";
import { formatter, getDateAndTimeStrings } from "~/helpers/conversions";
import useResize from "~/hooks/use-resize";

interface BillViewProps {
  bill: Bill;
}

const BillView: React.FC<BillViewProps> = ({ bill }) => {
  const { width } = useResize(100);

  return (
    <>
      <Text fontSize="3xl" fontWeight="semibold">
        {bill.title}
      </Text>
      <Stack
        direction={width > 500 ? "row" : "column"}
        justifyContent="space-between"
      >
        <DisplayField label="Balance">
          {formatter.format(bill.balance)}
        </DisplayField>
        <DisplayField label="Limit">
          {formatter.format(bill.limit)}
        </DisplayField>
      </Stack>
      <Stack
        direction={width > 500 ? "row" : "column"}
        justifyContent="flex-start"
      >
        <DisplayField label="Interest">{`${bill.interestRate}%`}</DisplayField>
        <DisplayField label="Payment">
          {formatter.format(bill.payment)}
        </DisplayField>
      </Stack>
      <Stack direction={width > 500 ? "row" : "column"}>
        <DisplayField label="Day Due">
          {formatter.format(bill.payment)}
        </DisplayField>
        <DisplayField label="Last Updated at">
          {getDateAndTimeStrings(new Date(bill.updatedAt))}
        </DisplayField>
      </Stack>
    </>
  );
};

export default BillView;
