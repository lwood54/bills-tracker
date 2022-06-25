import type { Bill } from "@prisma/client";
import * as React from "react";
import { formatter, getDateAndTimeStrings } from "~/helpers/conversions";

interface BillViewProps {
  bill: Bill;
}

const BillView: React.FC<BillViewProps> = ({ bill }) => {
  return (
    <div className="view-container">
      <h3 className="title">{bill.title}</h3>
      <BillViewSection label="Balance" value={formatter.format(bill.balance)} />
      <BillViewSection label="Limit" value={formatter.format(bill.limit)} />
      <BillViewSection label="Interest Rate" value={`${bill.interestRate}%`} />
      <BillViewSection label="Payment" value={formatter.format(bill.payment)} />
      <BillViewSection label="Day Due" value={bill.dayDue} />
      <BillViewSection
        label="Last Updated at"
        value={getDateAndTimeStrings(new Date(bill.updatedAt))}
      />
    </div>
  );
};

export default BillView;

function BillViewSection({
  label,
  value,
}: {
  label: string;
  value: string | number | Date;
}) {
  return (
    <div className="item">
      <p className="item-label">{label}</p>
      <p className="item-value">{value}</p>
    </div>
  );
}
