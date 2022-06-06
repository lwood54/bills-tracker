import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import * as React from "react";
import { createBill } from "~/models/bill.server";

// import { createNote } from "~/models/note.server";
import { requireUserId } from "~/session.server";

type ActionData = {
  errors?: {
    title?: string;
    balance?: string;
    payment?: string;
    dayDue?: string;
    interestRate?: string;
    category?: string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const balance = Number(formData.get("balance"));
  const dayDue = Number(formData.get("dayDue"));
  const interestRate = Number(formData.get("interestRate"));
  const payment = Number(formData.get("payment"));
  const title = formData.get("title")?.toString();

  if (typeof title !== "string" || title.length === 0) {
    return json<ActionData>(
      { errors: { title: "Title is required" } },
      { status: 400 }
    );
  }

  const bill = await createBill({
    balance,
    dayDue,
    interestRate,
    payment,
    title,
    userId,
  });

  return redirect(`/bills/${bill.id}`);
};

export default function NewBillPage() {
  const actionData = useActionData<ActionData>();
  const titleRef = React.useRef<HTMLInputElement>(null);
  // const bodyRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.title) {
      titleRef.current?.focus();
    }
  }, [actionData]);

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
            aria-invalid={Boolean(actionData?.errors?.title)}
            aria-errormessage={actionData?.errors?.title && "title-error"}
          />
        </label>
        {actionData?.errors?.title && (
          <div className="pt-1 text-red-700" id="title-error">
            {actionData.errors.title}
          </div>
        )}
      </div>

      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Balance</span>
          <input
            name="balance"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            aria-invalid={Boolean(actionData?.errors?.balance)}
            aria-errormessage={actionData?.errors?.balance && "balance-error"}
          />
        </label>
        {actionData?.errors?.balance && (
          <div className="pt-1 text-red-700" id="balance-error">
            {actionData.errors.balance}
          </div>
        )}
      </div>
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Day Due</span>
          <input
            name="dayDue"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            aria-invalid={Boolean(actionData?.errors?.dayDue)}
            aria-errormessage={actionData?.errors?.dayDue && "dayDue-error"}
          />
        </label>
        {actionData?.errors?.dayDue && (
          <div className="pt-1 text-red-700" id="dayDue-error">
            {actionData.errors.dayDue}
          </div>
        )}
      </div>
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Interest Rate</span>
          <input
            name="interestRate"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            aria-invalid={Boolean(actionData?.errors?.interestRate)}
            aria-errormessage={
              actionData?.errors?.interestRate && "interestRate-error"
            }
          />
        </label>
        {actionData?.errors?.interestRate && (
          <div className="pt-1 text-red-700" id="interestRate-error">
            {actionData.errors.interestRate}
          </div>
        )}
      </div>
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Payment</span>
          <input
            name="payment"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            aria-invalid={Boolean(actionData?.errors?.payment)}
            aria-errormessage={actionData?.errors?.payment && "payment-error"}
          />
        </label>
        {actionData?.errors?.payment && (
          <div className="pt-1 text-red-700" id="payment-error">
            {actionData.errors.payment}
          </div>
        )}
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Save
        </button>
      </div>
    </Form>
  );
}
