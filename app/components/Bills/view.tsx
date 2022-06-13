import type { Bill } from "@prisma/client";
import * as React from "react";

interface BillViewProps {
  bill: Bill;
}

const BillView: React.FC<BillViewProps> = ({ bill }) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl font-bold">{bill.title}</h3>
      <BillViewSection label="Balance" value={bill.balance} />
      <BillViewSection label="Day Due" value={bill.dayDue} />
      <BillViewSection label="Interest Rate" value={`${bill.interestRate}%`} />
      <BillViewSection label="Payment" value={bill.payment} />
      <BillViewSection label="Last Updated at" value={bill.updatedAt} />
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
    <div className="border-b-2 border-solid border-slate-400">
      <p className="text-xl font-semibold">{label}</p>
      <p className="py-1">{value}</p>
    </div>
  );
}
