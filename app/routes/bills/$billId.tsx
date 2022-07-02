import * as React from "react";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  useActionData,
  useCatch,
  useLoaderData,
  useSubmit,
  useTransition,
} from "@remix-run/react";
import invariant from "tiny-invariant";
import type { Bill } from "~/models/bill.server";
import { getBillListItems } from "~/models/bill.server";
import { updateBill } from "~/models/bill.server";
import { deleteBill, getBill } from "~/models/bill.server";
import { requireUserId } from "~/session.server";
import Delete from "~/components/Bills/delete";
import Paydown from "~/components/Bills/Paydown";
import { FormProvider, useForm } from "react-hook-form";
import { dataToFormData } from "~/helpers/conversions";
import { Container, HStack, Stack } from "@chakra-ui/react";
import Card from "~/components/Card";
import Inset from "~/components/Inset";
import ButtonBase, { BTN } from "~/components/ButtonBase/button-base";
import { urlPath } from "~/constants/url-paths";
import { View } from "~/components/Bills/View";
import { Modify } from "~/components/Bills/Modify";

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
  console.log({ billId });
  invariant(params.billId, "billId not found");

  const formData = await request.formData();
  const isDelete = formData.get("action_type");

  if (isDelete) {
    await deleteBill({ userId, id: billId });

    return redirect(urlPath.BILLS_LIST);
  }

  const balance = Number(formData.get("balance"));
  const dayDue = Number(formData.get("dayDue"));
  const interestRate = Number(formData.get("interestRate"));
  const payment = Number(formData.get("payment"));
  const title = formData.get("title")?.toString() ?? "";
  const limit = Number(formData.get("limit"));

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
    return redirect(urlPath.BILLS_LIST);
  }

  return {
    error: new Error("There was an error submitting your bill."),
  };
};

export default function NoteDetailsPage() {
  const { state } = useTransition();
  const submit = useSubmit();
  const actionData = useActionData<BillActionData>();
  const { bill, bills } = useLoaderData<LoaderData>();
  const [isEdit, setIsEdit] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  const methods = useForm<Bill>({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      title: bill?.title || "",
      balance: bill?.balance || 0,
      interestRate: bill?.interestRate || 0,
      limit: bill?.limit || 0,
      dayDue: bill?.dayDue || 1,
      payment: bill?.payment || 0,
    },
  });
  const { handleSubmit } = methods;
  const handleSave = (data: Bill) => {
    submit(dataToFormData(data), { method: "post" });
  };

  return (
    <Inset>
      <Card>
        <Stack spacing="4">
          <Container>
            <Stack spacing="4">
              {isEdit ? (
                <FormProvider {...methods}>
                  <Modify bill={bill} />
                </FormProvider>
              ) : (
                <View bill={bill} />
              )}
              <Paydown bill={bill} />
            </Stack>
          </Container>
          <Container>
            <HStack justifyContent="flex-end" gap="4">
              {isEdit ? (
                <>
                  <ButtonBase
                    variant={BTN.NEGATIVE}
                    onClick={() => setIsEdit(false)}
                  >
                    Cancel
                  </ButtonBase>
                  <ButtonBase
                    variant={BTN.POSITIVE}
                    onClick={handleSubmit(handleSave)}
                  >
                    Save
                  </ButtonBase>
                </>
              ) : (
                <>
                  <Delete>
                    <ButtonBase type="submit" variant={BTN.NEGATIVE}>
                      Delete
                    </ButtonBase>
                  </Delete>
                  <ButtonBase
                    onClick={() => setIsEdit(true)}
                    variant={BTN.POSITIVE}
                  >
                    Edit
                  </ButtonBase>
                </>
              )}
            </HStack>
          </Container>
        </Stack>
      </Card>
    </Inset>
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
