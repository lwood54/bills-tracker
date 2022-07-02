import { Stack, Text } from "@chakra-ui/react";
import type { Bill } from "@prisma/client";
import * as React from "react";
import DisplayField from "~/components/DisplayField";
import { formatter, getDateAndTimeStrings } from "~/helpers/conversions";
import useBreakpoints, { BP, BP_VALUES } from "~/hooks/use-breakpoints";

interface BillViewProps {
  bill: Bill;
}

const BillView: React.FC<BillViewProps> = ({ bill }) => {
  const containerRef = React.useRef({} as HTMLDivElement);
  const size = useBreakpoints(containerRef, BP_VALUES);
  const directionType = size === BP.sm ? "column" : "row";

  return (
    <>
      <Text fontSize="3xl" fontWeight="semibold">
        {bill.title}
      </Text>
      <Stack
        ref={containerRef}
        direction={directionType}
        justifyContent="space-between"
      >
        <DisplayField label="Balance">
          {formatter.format(bill.balance)}
        </DisplayField>
        <DisplayField label="Limit">
          {formatter.format(bill.limit)}
        </DisplayField>
      </Stack>
      <Stack direction={directionType} justifyContent="flex-start">
        <DisplayField label="Interest">{`${bill.interestRate}%`}</DisplayField>
        <DisplayField label="Payment">
          {formatter.format(bill.payment)}
        </DisplayField>
      </Stack>
      <Stack direction={directionType}>
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
