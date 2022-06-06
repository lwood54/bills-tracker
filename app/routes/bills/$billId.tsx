import * as React from "react";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import type { Bill } from "~/models/bill.server";
import { updateBill } from "~/models/bill.server";
import { deleteBill, getBill } from "~/models/bill.server";
import { requireUserId } from "~/session.server";

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

  // await deleteBill({ userId, id: params.billId });

  // return redirect("/bills");

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
  const titleRef = React.useRef<HTMLInputElement>(null);
  const data = useLoaderData<LoaderData>();
  const [isEdit, setIsEdit] = React.useState(false);

  return (
    <div>
      {isEdit ? (
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
              <span>Title: </span>
              <input
                ref={titleRef}
                name="title"
                className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
                aria-invalid={Boolean(actionData?.errors?.title)}
                aria-errormessage={actionData?.errors?.title && "title-error"}
                defaultValue={data.bill.title}
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
              <span>Balance: </span>
              <input
                name="balance"
                className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
                aria-invalid={Boolean(actionData?.errors?.balance)}
                aria-errormessage={
                  actionData?.errors?.balance && "balance-error"
                }
                defaultValue={data.bill.balance}
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
              <span>Day Due: </span>
              <input
                name="dayDue"
                className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
                aria-invalid={Boolean(actionData?.errors?.dayDue)}
                aria-errormessage={actionData?.errors?.dayDue && "dayDue-error"}
                defaultValue={data.bill.dayDue}
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
              <span>Interest Rate: </span>
              <input
                name="interestRate"
                className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
                aria-invalid={Boolean(actionData?.errors?.interestRate)}
                aria-errormessage={
                  actionData?.errors?.interestRate && "interestRate-error"
                }
                defaultValue={data.bill.interestRate}
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
              <span>Payment: </span>
              <input
                name="payment"
                className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
                aria-invalid={Boolean(actionData?.errors?.payment)}
                aria-errormessage={
                  actionData?.errors?.payment && "payment-error"
                }
                defaultValue={data.bill.payment}
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
      ) : (
        <>
          <h3 className="text-2xl font-bold">{data.bill.title}</h3>
          <p className="py-6">{data.bill.balance}</p>
        </>
      )}
      <hr className="my-4" />
      <div className="flex gap-4">
        <button
          onClick={() => setIsEdit(!isEdit)}
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          {isEdit ? "Cancel" : "Edit"}
        </button>
        <Form method="post">
          <input hidden readOnly value="delete" name="action_type" />
          <button
            type="submit"
            className="rounded bg-red-500  py-2 px-4 text-white hover:bg-red-600 focus:bg-blue-400"
          >
            Delete
          </button>
        </Form>
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
