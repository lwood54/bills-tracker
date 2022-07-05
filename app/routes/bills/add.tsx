import { Button, HStack, Stack } from "@chakra-ui/react";
import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  useActionData,
  useNavigate,
  useSubmit,
  useTransition,
} from "@remix-run/react";
import { FormProvider, useForm } from "react-hook-form";
import { BackgroundContainer } from "~/components/BackgroundContainer";
import { Modify } from "~/components/Bills/Modify";
import ButtonBase from "~/components/ButtonBase/button-base";
import Card from "~/components/Card";
import { urlPath } from "~/constants/url-paths";
import { dataToFormData } from "~/helpers/conversions";
import type { Bill } from "~/models/bill.server";
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
    submit?: string;
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
    return redirect(`${urlPath.BILLS_LIST}`);
  }

  return json<ActionData>(
    { errors: { submit: "There was an error adding your bill." } },
    { status: 400 }
  );
};

export default function NewBillPage() {
  const actionData = useActionData<ActionData>();
  const navigate = useNavigate();
  const { state } = useTransition();
  const submit = useSubmit();
  const methods = useForm<Bill>({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
      balance: 0,
      interestRate: 0,
      limit: 0,
      dayDue: 1,
      payment: 0,
    },
  });
  const { handleSubmit } = methods;
  const handleSave = (data: Bill) => {
    submit(dataToFormData(data), { method: "post" });
  };
  return (
    <BackgroundContainer p="4">
      <Card>
        <Stack>
          <FormProvider {...methods}>
            <Modify />
          </FormProvider>
          <HStack justifyContent="flex-end" w="full" spacing="4">
            <ButtonBase
              onClick={() => navigate(urlPath.BILLS_LIST)}
              variant="NEGATIVE"
            >
              Cancel
            </ButtonBase>
            <ButtonBase
              disabled={state === "submitting"}
              isLoading={state === "submitting" || state === "loading"}
              onClick={handleSubmit(handleSave)}
            >
              Save
            </ButtonBase>
          </HStack>
        </Stack>
      </Card>
    </BackgroundContainer>
  );
}
