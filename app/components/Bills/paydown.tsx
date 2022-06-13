import type { Bill } from "@prisma/client";
import * as React from "react";
import { formatter } from "~/helpers/conversions";
import { calcMonthsToPayDown } from "~/helpers/paydown";

interface PaydownProps {
  bill: Bill;
}
const Paydown: React.FC<PaydownProps> = ({ bill }) => {
  const { count, totalInterest } = calcMonthsToPayDown(
    bill.payment,
    bill.balance,
    bill.interestRate
  );

  return (
    <>
      <h2 className="text-l">Balance</h2>
      <p className="text-m">{formatter.format(bill.balance)}</p>
      <h2 className="text-l">Interest Rate</h2>
      <p className="text-m">{bill.interestRate}</p>
      {count < 0 ? (
        <p className="text-m w-96 bg-red-600 p-2 text-white">
          Minimum payments do not cover the interest charge.
        </p>
      ) : (
        <>
          <h2 className="text-l">Remaining Payments</h2>
          <p className="text-m">{count}</p>
          <h2 className="text-l">Total Interest Paid</h2>
          <p className="text-m">{formatter.format(totalInterest)}</p>
        </>
      )}
    </>
  );
};

export default Paydown;
