import { Container, HStack, Progress, Stack, Text } from "@chakra-ui/react";
import type { Bill } from "@prisma/client";
import * as React from "react";
import { formatter } from "~/helpers/conversions";
import { calcMonthsToPayDown } from "~/helpers/paydown";

interface PaydownProps {
  bill: Bill;
  showTitle?: boolean;
  showDetails?: boolean;
}
const Paydown: React.FC<PaydownProps> = ({ bill, showDetails = false }) => {
  const { count, totalInterest } = calcMonthsToPayDown(
    bill.payment,
    bill.balance,
    bill.interestRate
  );

  const percentRemaining =
    bill.limit >= bill.balance ? (bill.balance / bill.limit) * 100 : 0;

  return (
    <Stack direction="column" spacing="1">
      {showDetails && (
        <Stack direction="row">
          <Stack w="50%" spacing="0">
            <Text fontWeight="semibold">Remaining Payments</Text>
            {count < 0 ? (
              <Text fontWeight="semibold">
                Minimum payments do not cover the interest charge.
              </Text>
            ) : (
              <Text fontWeight="semibold">{count}</Text>
            )}
          </Stack>
          <Stack w="50%" spacing="0">
            <Text fontWeight="semibold">Total Interest</Text>
            <Text fontWeight="semibold">{formatter.format(totalInterest)}</Text>
          </Stack>
        </Stack>
      )}
      <Stack direction="row" justifyContent="space-between">
        <Text fontWeight="semibold" fontSize={12} color="white">
          {formatter.format(bill.balance)}
        </Text>
        <Text fontWeight="semibold" fontSize={12} color="white">
          {formatter.format(bill.limit)}
        </Text>
      </Stack>
      <Progress colorScheme="gray" value={percentRemaining} />
    </Stack>
    // <Progress colorScheme="teal" bgColor="gray.300" value={percentRemaining} />
    // <Container>
    // <Stack direction="column" spacing="1">
    //   <Stack direction="row" justifyContent="space-between">
    //     <Text fontWeight="semibold" fontSize={12}>
    //       {formatter.format(bill.balance)}
    //     </Text>
    //     <Text fontWeight="semibold" fontSize={12}>
    //       {formatter.format(bill.limit)}
    //     </Text>
    //   </Stack>
    //   <Progress
    //     colorScheme="cyan"
    //     bgColor="cyan.100"
    //     value={percentRemaining}
    //   />
    // </Stack>
    // </Container>
    // <div className="paydown-container">
    //   {showTitle && <h3 className="title">{bill.title}</h3>}
    //   <div className="progress-container">
    //     <div className="progress-label">
    //       <p className="label">{formatter.format(bill.balance)}</p>
    //       <p className="label">{formatter.format(bill.limit)}</p>
    //     </div>
    //     <div className="progress-outter">
    //       <div
    //         className="progress-inner"
    //         style={{ width: `${percentRemaining}%` }}
    //       />
    //     </div>
    //   </div>
    // <div className="details">
    //   <div className="payment-container">
    //     <p className="label">Remaining Payments</p>
    //     {count < 0 ? (
    //       <p className="payment-label">
    //         Minimum payments do not cover the interest charge.
    //       </p>
    //     ) : (
    //       <p className="payment-label">{count}</p>
    //     )}
    //   </div>
    //   <div className="payment-container">
    //     <p className="label">Total Interest</p>
    //     {formatter.format(totalInterest)}
    //   </div>
    // </div>
    // </div>
  );
};

export default Paydown;
