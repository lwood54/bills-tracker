import * as React from "react";
import type {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import type { Bill } from "~/models/bill.server";
import { getBillListItems } from "~/models/bill.server";
import { updateBill } from "~/models/bill.server";
import { deleteBill, getBill } from "~/models/bill.server";
import { requireUserId } from "~/session.server";
import Delete from "~/components/Bills/delete";
import Paydown, { links as paydownStyles } from "~/components/Bills/Paydown";
import Menu, { links as menuStyles } from "~/components/Bills/Menu";
import billsStyles from "~/styles/bills.css";
import View, { links as viewStyles } from "~/components/Bills/View";
import Button, { BTN, links as buttonStyles } from "~/components/Button";
import Modify, { links as modifyStyles } from "~/components/Bills/Modify";

export const links: LinksFunction = () => {
  return [
    ...buttonStyles(),
    ...paydownStyles(),
    ...menuStyles(),
    ...modifyStyles(),
    ...viewStyles(),
    { rel: "stylesheet", href: billsStyles },
  ];
};

type LoaderData = {
  bill: Bill;
  bills: Bill[];
};

export type BillErrors = {
  balance?: string;
  dayDue?: string;
  interestRate?: string;
  limit?: string;
  title?: string;
  payment?: string;
};

export type BillActionData = {
  errors?: BillErrors;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.billId, "billId not found");

  const bill = await getBill({ userId, id: params.billId });
  if (!bill) {
    throw new Response("Not Found", { status: 404 });
  }
  const billListItems = await getBillListItems({ userId });
  return json<LoaderData>({ bill, bills: billListItems });
};

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  const billId = params.billId ?? "";
  invariant(params.billId, "billId not found");

  const formData = await request.formData();
  const isDelete = formData.get("action_type");

  if (isDelete) {
    await deleteBill({ userId, id: billId });

    return redirect("/bills");
  }

  const balance = Number(formData.get("balance"));
  const dayDue = Number(formData.get("daydue"));
  const interestRate = Number(formData.get("interestrate"));
  const payment = Number(formData.get("payment"));
  const title = formData.get("title")?.toString();
  const limit = Number(formData.get("limit"));

  const invalidTitle = typeof title !== "string" || title.length === 0;
  const invalidBalance = typeof balance !== "number" || balance < 0;
  const invalidLimit = typeof limit !== "number" || limit < balance;
  const invalidDayDue =
    typeof dayDue !== "number" || dayDue <= 0 || dayDue > 31;
  const invalidInterestRate =
    typeof interestRate !== "number" || interestRate < 0;
  const invalidPayment = typeof payment !== "number" || payment < 0;

  const errors = {
    title: invalidTitle ? "Title is required" : "",
    balance: invalidBalance
      ? "Balance is required and must be greater than or equal to zero."
      : "",
    dayDue: invalidDayDue
      ? "Day Due is required and must be between 1 and 31."
      : "",
    interestRate: invalidInterestRate
      ? "Interest Rate is required and must be greater than or equal to zero."
      : "",
    limit: invalidLimit ? "Credit Limit must be greater than balance." : "",
    payment: invalidPayment
      ? "Payment is required and must be greater than or equal to zero."
      : "",
  };

  if (
    invalidTitle ||
    invalidBalance ||
    invalidLimit ||
    invalidDayDue ||
    invalidInterestRate ||
    invalidPayment
  ) {
    return json<BillActionData>({ errors }, { status: 400 });
  }

  const payload = {
    balance,
    limit,
    dayDue,
    interestRate,
    payment,
    title,
  };

  const bill = await updateBill({ id: billId ?? "", userId, payload });

  if (bill) {
    return redirect("/bills");
  }

  return {
    errors,
  };
};

export default function NoteDetailsPage() {
  const actionData = useActionData<BillActionData>();
  const data = useLoaderData<LoaderData>();
  const [isEdit, setIsEdit] = React.useState(false);

  return (
    <div className="bill-page-container">
      <Menu bills={data.bills} />
      <div className="bill-container">
        {isEdit ? (
          <Modify bill={data.bill} errors={actionData?.errors} />
        ) : (
          <View bill={data.bill} />
        )}
        <Paydown bill={data.bill} />
        <div className="button-container">
          <Button
            label={isEdit ? "Cancel" : "Edit"}
            onClick={() => setIsEdit(!isEdit)}
            variant={BTN.EDIT}
          />
          <Delete />
        </div>
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Note not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
