import type { Bill } from "@prisma/client";
import * as React from "react";

interface BillViewProps {
  data: { bill: Bill };
}
const BillView: React.FC<BillViewProps> = ({ data }) => {
  return (
    <>
      <>
        <h3 className="text-2xl font-bold">{data.bill.title}</h3>
        <BilLViewSection label="Balance" value={data.bill.balance} />
        <BilLViewSection label="Day Due" value={data.bill.dayDue} />
        <BilLViewSection
          label="Interest Rate"
          value={`${data.bill.interestRate}%`}
        />
        <BilLViewSection label="Payment" value={data.bill.payment} />
        <BilLViewSection label="Last Updated at" value={data.bill.updatedAt} />
      </>
    </>
  );
};

export default BillView;

function BilLViewSection({
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
