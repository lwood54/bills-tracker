import * as React from "react";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import type { Bill } from "~/models/bill.server";
import { updateBill } from "~/models/bill.server";
import { deleteBill, getBill } from "~/models/bill.server";
import { requireUserId } from "~/session.server";
import Button, { BTN } from "~/components/button";
import BillModify from "~/components/Bills/bill-modify";
import DeleteForm from "~/components/Bills/bill-delete";
import BillView from "~/components/Bills/bill-view";

type LoaderData = {
  bill: Bill;
};

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

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.billId, "billId not found");

  const bill = await getBill({ userId, id: params.billId });
  if (!bill) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({ bill });
};

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  const billId = params.billId ?? "";
  invariant(params.billId, "billId not found");

  const formData = await request.formData();
  const isDelete = formData.get("action_type");

  if (isDelete) {
    console.log("1 HERE???");
    await deleteBill({ userId, id: billId });

    return redirect("/bills");
  }

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

  const payload = {
    balance,
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
    errors: { title: "error" },
  };
};

export default function NoteDetailsPage() {
  const actionData = useActionData<ActionData>();
  const data = useLoaderData<LoaderData>();
  const [isEdit, setIsEdit] = React.useState(false);

  return (
    <div>
      {isEdit ? (
        <BillModify data={data} errors={actionData?.errors} />
      ) : (
        <BillView data={data} />
      )}
      <hr className="my-4" />
      <div className="flex gap-4">
        <Button
          label={isEdit ? "Cancel" : "Edit"}
          onClick={() => setIsEdit(!isEdit)}
          variant={BTN.EDIT}
        />
        <DeleteForm />
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
