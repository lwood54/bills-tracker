import type { Bill } from "@prisma/client";
import { Form } from "@remix-run/react";
import * as React from "react";
import Button, { BTN } from "../button";

interface BillModifyProps {
  errors: any;
  data?: { bill: Bill };
}
const BillModify: React.FC<BillModifyProps> = ({ errors, data }) => {
  const titleRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (errors?.title) {
      titleRef.current?.focus();
    }
  }, [errors]);

  return (
    <Form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Title</span>
          <input
            ref={titleRef}
            name="title"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            aria-invalid={Boolean(errors?.title)}
            aria-errormessage={errors?.title && "title-error"}
            defaultValue={data?.bill.title}
          />
        </label>
        {errors?.title && (
          <div className="pt-1 text-red-700" id="title-error">
            {errors.title}
          </div>
        )}
      </div>

      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Balance</span>
          <input
            name="balance"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            aria-invalid={Boolean(errors?.balance)}
            aria-errormessage={errors?.balance && "balance-error"}
            defaultValue={data?.bill.balance}
          />
        </label>
        {errors?.balance && (
          <div className="pt-1 text-red-700" id="balance-error">
            {errors.balance}
          </div>
        )}
      </div>
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Day Due</span>
          <input
            name="dayDue"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            aria-invalid={Boolean(errors?.dayDue)}
            aria-errormessage={errors?.dayDue && "dayDue-error"}
            defaultValue={data?.bill.dayDue}
          />
        </label>
        {errors?.dayDue && (
          <div className="pt-1 text-red-700" id="dayDue-error">
            {errors.dayDue}
          </div>
        )}
      </div>
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Interest Rate</span>
          <input
            name="interestRate"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            aria-invalid={Boolean(errors?.interestRate)}
            aria-errormessage={errors?.interestRate && "interestRate-error"}
            defaultValue={data?.bill.interestRate}
          />
        </label>
        {errors?.interestRate && (
          <div className="pt-1 text-red-700" id="interestRate-error">
            {errors.interestRate}
          </div>
        )}
      </div>
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Payment</span>
          <input
            name="payment"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            aria-invalid={Boolean(errors?.payment)}
            aria-errormessage={errors?.payment && "payment-error"}
            defaultValue={data?.bill.payment}
          />
        </label>
        {errors?.payment && (
          <div className="pt-1 text-red-700" id="payment-error">
            {errors.payment}
          </div>
        )}
      </div>

      <div className="text-right">
        <Button label="Save" variant={BTN.SAVE} />
      </div>
    </Form>
  );
};

export default BillModify;
