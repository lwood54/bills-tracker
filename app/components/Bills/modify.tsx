import type { Bill } from "@prisma/client";
import { Form } from "@remix-run/react";
import * as React from "react";
import { concatToLowerCase } from "~/helpers/conversions";
import type { BillErrors } from "~/routes/bills/$billId";
import Button, { BTN } from "../button";

interface BillModifyProps {
  errors?: BillErrors;
  bill?: Bill;
}
const BillModify: React.FC<BillModifyProps> = ({ errors, bill }) => {
  const titleRef = React.useRef<HTMLInputElement>(null);
  const balanceRef = React.useRef<HTMLInputElement>(null);
  const dayDueRef = React.useRef<HTMLInputElement>(null);
  const interestRateRef = React.useRef<HTMLInputElement>(null);
  const paymentRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (errors?.title) {
      titleRef.current?.focus();
    }
    if (errors?.balance) {
      balanceRef.current?.focus();
    }
    if (errors?.dayDue) {
      dayDueRef.current?.focus();
    }
    if (errors?.interestRate) {
      interestRateRef.current?.focus();
    }
    if (errors?.payment) {
      paymentRef.current?.focus();
    }
  }, [errors]);

  return (
    <Form method="post" className="flex flex-col gap-4 pt-1">
      <ModifyField
        label="Title"
        defaultValue={bill?.title}
        error={errors?.title}
        sectionRef={titleRef}
      />
      <ModifyField
        label="Balance"
        defaultValue={bill?.balance}
        error={errors?.balance}
        sectionRef={balanceRef}
      />
      <ModifyField
        label="Day Due"
        defaultValue={bill?.dayDue}
        error={errors?.dayDue}
        sectionRef={dayDueRef}
      />
      <ModifyField
        label="Interest Rate"
        defaultValue={bill?.interestRate}
        error={errors?.interestRate}
        sectionRef={interestRateRef}
      />
      <ModifyField
        label="Payment"
        defaultValue={bill?.payment}
        error={errors?.payment}
        sectionRef={paymentRef}
      />
      <div className="text-right">
        <Button label="Save" variant={BTN.SAVE} />
      </div>
    </Form>
  );
};

export default BillModify;

function ModifyField({
  error,
  label,
  defaultValue,
  sectionRef,
}: {
  error?: string;
  label: string;
  defaultValue?: string | number | readonly string[];
  sectionRef?: React.RefObject<HTMLInputElement>;
}) {
  return (
    <label className="bg-slate-200">
      <p className="text-xl font-semibold">{label}</p>
      {console.log("concat --> ", concatToLowerCase(label))}
      <input
        ref={sectionRef}
        // name={label.toLocaleLowerCase()}
        name={concatToLowerCase(label)}
        className="w-full border-b-2 border-solid border-slate-400 bg-slate-200"
        aria-invalid={Boolean(error)}
        aria-errormessage={error && `${error}-error`}
        defaultValue={defaultValue}
      />
      {error && (
        <div className="pt-1 text-red-700" id={`${error}-error`}>
          {error}
        </div>
      )}
    </label>
  );
}
