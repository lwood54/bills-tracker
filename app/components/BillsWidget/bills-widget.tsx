import { Stack } from "@chakra-ui/react";
import * as React from "react";
import { formatter } from "~/helpers/conversions";
import type { Totals } from "~/types/bills";
import Card from "../Card";
import DisplayField from "../DisplayField";

interface BillsWidgetProps {
  children?: React.ReactNode;
  details: Totals;
}
const BillsWidget: React.FC<BillsWidgetProps> = ({ details }) => {
  const { balance, payments, interestPayments } = details;
  return (
    <Card>
      <Stack>
        <DisplayField label="Total Debt">
          {formatter.format(balance)}
        </DisplayField>
        <DisplayField label="Total Monthly Payments">
          {formatter.format(payments)}
        </DisplayField>
        <DisplayField label="Remaining Interest to be Paid">
          {formatter.format(interestPayments)}
        </DisplayField>
      </Stack>
    </Card>
  );
};

export default BillsWidget;
