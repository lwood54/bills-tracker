import { Stack } from "@chakra-ui/react";
import type { Bill } from "@prisma/client";
import { Form } from "@remix-run/react";
import * as React from "react";
import { useFormContext } from "react-hook-form";
import { FormInput } from "~/components/FormInput";
import { VALIDATION } from "~/constants/bills";

import { isPositive } from "~/helpers/conversions";
import useBreakpoints, { BP, BP_VALUES } from "~/hooks/use-breakpoints";

interface ModifyProps {
  bill?: Bill;
}
const Modify: React.FC<ModifyProps> = ({ bill }) => {
  const modifyRef = React.useRef({} as HTMLDivElement);
  const size = useBreakpoints(modifyRef, BP_VALUES);
  const directionType = size === BP.sm ? "column" : "row";

  const { register, formState } = useFormContext<Bill>();
  const { errors } = formState;

  return (
    <Form>
      <Stack>
        <FormInput
          id="title"
          error={errors?.title}
          {...register("title", {
            required: VALIDATION.REQUIRED,
          })}
          label="Title"
        />
        <Stack ref={modifyRef} direction={directionType}>
          <FormInput
            id="balance"
            error={errors.balance}
            {...register("balance", {
              required: VALIDATION.REQUIRED,
              validate: (v) => isPositive(v, true) || VALIDATION.POS_INT,
            })}
            label="Balance"
          />
          <FormInput
            id="limit"
            error={errors.limit}
            {...register("limit", {
              required: VALIDATION.REQUIRED,
              validate: (v) => isPositive(v, true) || VALIDATION.POS_INT, // TODO: validate for greater than balance
            })}
            label="Limit"
          />
        </Stack>
        <Stack direction={directionType}>
          <FormInput
            id="interest"
            error={errors.interestRate}
            {...register("interestRate", {
              required: VALIDATION.REQUIRED,
              validate: (v) => isPositive(v, true) || VALIDATION.POS_INT,
            })}
            label="Interest"
          />
          <FormInput
            id="payment"
            error={errors.payment}
            {...register("payment", {
              required: VALIDATION.REQUIRED,
              validate: (v) => isPositive(v, true) || VALIDATION.POS_INT,
            })}
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
          label="Day Due"
        />
      </Stack>
    </Form>
  );
};

export default Modify;
