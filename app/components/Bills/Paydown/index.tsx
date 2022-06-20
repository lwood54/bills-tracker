import type { Bill } from "@prisma/client";
import * as React from "react";
import type { LinksFunction } from "@remix-run/node";
import styles from "./styles.css";
import { formatter } from "~/helpers/conversions";
import { calcMonthsToPayDown } from "~/helpers/paydown";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

interface PaydownProps {
  bill: Bill;
  showTitle?: boolean;
}
const Paydown: React.FC<PaydownProps> = ({ bill, showTitle = false }) => {
  const { count, totalInterest } = calcMonthsToPayDown(
    bill.payment,
    bill.balance,
    bill.interestRate
  );

  const percentRemaining =
    bill.limit >= bill.balance ? (bill.balance / bill.limit) * 100 : 0;
  console.log({ percentRemaining });

  return (
    <div className="paydown-container">
      {showTitle && <h3 className="title">{bill.title}</h3>}
      <div className="progress-container">
        <div className="progress-label">
          <p className="label">{formatter.format(bill.balance)}</p>
          <p className="label">{formatter.format(bill.limit)}</p>
        </div>
        <div className="progress-outter">
          <div
            className="progress-inner"
            style={{ width: `${percentRemaining}%` }}
          />
        </div>
      </div>
      <div className="details">
        <div className="payment-container">
          <p className="label">Remaining Payments</p>
          {count < 0 ? (
            <p className="payment-label">
              Minimum payments do not cover the interest charge.
            </p>
          ) : (
            <p className="payment-label">{count}</p>
          )}
        </div>
        <div className="payment-container">
          <p className="label">Total Interest</p>
          {formatter.format(totalInterest)}
        </div>
      </div>
    </div>
  );
};

export default Paydown;
