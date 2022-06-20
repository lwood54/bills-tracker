import type { ActionFunction, LinksFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import Modify, { links as modifyStyles } from "~/components/Bills/Modify";
import { urlPath } from "~/constants/url-paths";
import { createBill } from "~/models/bill.server";
import { requireUserId } from "~/session.server";

export const links: LinksFunction = () => {
  return [...modifyStyles()];
};

type ActionData = {
  errors?: {
    title?: string;
    balance?: string;
    payment?: string;
    dayDue?: string;
    interestRate?: string;
    category?: string;
    submit?: string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const balance = Number(formData.get("balance"));
  const dayDue = Number(formData.get("daydue"));
  const interestRate = Number(formData.get("interestrate"));
  const payment = Number(formData.get("payment"));
  const title = formData.get("title")?.toString();
  const limit = Number(formData.get("limit"));

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
    limit,
    payment,
    title,
    userId,
  });

  if (bill) {
    return redirect(`${urlPath.BILLS}`);
  }

  return json<ActionData>(
    { errors: { submit: "There was an error adding your bill." } },
    { status: 400 }
  );
};

export default function NewBillPage() {
  const actionData = useActionData<ActionData>();
  return <Modify errors={actionData?.errors} />;
}
