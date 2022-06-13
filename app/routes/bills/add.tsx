import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import Modify from "~/components/Bills/modify";
import { createBill } from "~/models/bill.server";
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
  return <Modify errors={actionData?.errors} />;
}
