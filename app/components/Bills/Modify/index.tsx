import { Box, Button, Stack } from "@chakra-ui/react";
import type { Bill } from "@prisma/client";
import { Form, useSubmit, useTransition } from "@remix-run/react";
import * as React from "react";
import { useFormContext } from "react-hook-form";
import FormInput from "~/components/FormInput";
import { VALIDATION } from "~/constants/bills";

import { dataToFormData, isPositive } from "~/helpers/conversions";
import useResize from "~/hooks/use-resize";

interface ModifyProps {
  bill?: Bill;
}
const Modify: React.FC<ModifyProps> = ({ bill }) => {
  const submit = useSubmit();
  const { width } = useResize(100);
  const { handleSubmit, register, formState } = useFormContext<Bill>();
  const { errors } = formState;

  // const onSubmit = (data: Bill) => {
  //   submit(dataToFormData(data), { method: "post" });
  // };

  return (
    // <Form onSubmit={handleSubmit(onSubmit)} method="post">
    <Form>
      <FormInput
        id="title"
        error={errors?.title}
        {...register("title", {
          required: VALIDATION.REQUIRED,
        })}
        placeholder="American Express"
        label="Title"
      />
      <Stack
        direction="row"
        width="100%"
        flexWrap={width > 500 ? "nowrap" : "wrap"}
      >
        <FormInput
          id="balance"
          error={errors.balance}
          {...register("balance", {
            required: VALIDATION.REQUIRED,
            validate: (v) => isPositive(v, true) || VALIDATION.POS_INT,
          })}
          placeholder="Balance"
          label="Balance"
        />
        <FormInput
          id="limit"
          error={errors.limit}
          {...register("limit", {
            required: VALIDATION.REQUIRED,
            validate: (v) => isPositive(v, true) || VALIDATION.POS_INT, // TODO: validate for greater than balance
          })}
          placeholder="4000"
          label="Limit"
        />
      </Stack>
      <Stack
        direction="row"
        width="100%"
        flexWrap={width > 500 ? "nowrap" : "wrap"}
      >
        <FormInput
          id="interest"
          error={errors.interestRate}
          {...register("interestRate", {
            required: VALIDATION.REQUIRED,
            validate: (v) => isPositive(v, true) || VALIDATION.POS_INT,
          })}
          placeholder="Interest"
          label="Interest"
        />
        <FormInput
          id="payment"
          error={errors.payment}
          {...register("payment", {
            required: VALIDATION.REQUIRED,
            validate: (v) => isPositive(v, true) || VALIDATION.POS_INT,
          })}
          placeholder="Payment"
          label="Payment"
        />
      </Stack>
      <FormInput
        id="dayDue"
        error={errors.dayDue}
        {...register("dayDue", {
          required: VALIDATION.REQUIRED,
          validate: {
            positive: (v) => isPositive(v) || VALIDATION.GREATER_THAN_ZERO,
            lessThan30: (v) => Number(v) < 32 || VALIDATION.LESS_THAN_32,
          },
        })}
        placeholder="Day Due"
        label="Day Due"
      />
    </Form>
  );
};

export default Modify;

// function ModifyField({
//   error,
//   label,
//   defaultValue,
//   sectionRef,
// }: {
//   error?: string;
//   label: string;
//   defaultValue?: string | number | readonly string[];
//   sectionRef?: React.RefObject<HTMLInputElement>;
// }) {
//   return (
//     <label className="bg-slate-200">
//       <p className="text-xl font-semibold">{label}</p>
//       <input
//         ref={sectionRef}
//         name={concatToLowerCase(label)}
//         className="w-full border-b-2 border-solid border-slate-400 bg-slate-200"
//         aria-invalid={Boolean(error)}
//         aria-errormessage={error && `${error}-error`}
//         defaultValue={defaultValue}
//       />
//       {error && (
//         <div className="pt-1 text-red-700" id={`${error}-error`}>
//           {error}
//         </div>
//       )}
//     </label>
//   );
// }
