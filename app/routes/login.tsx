import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  Link,
  useActionData,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import * as React from "react";

import { createUserSession, getUserId } from "~/session.server";
import { verifyLogin } from "~/models/user.server";
import { safeRedirect, validateEmail, validatePassword } from "~/utils";
import { urlPath } from "~/constants/url-paths";
import { BackgroundContainer } from "~/components/BackgroundContainer";
import { FormInput } from "~/components/FormInput";
import { FormProvider, useForm } from "react-hook-form";
import { VALIDATION } from "~/constants/bills";
import { Box, Container, HStack, Stack, Text } from "@chakra-ui/react";
import { dataToFormData } from "~/helpers/conversions";
import ButtonBase from "~/components/ButtonBase/button-base";
import { LoginForm } from "~/components/LoginForm";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

interface ActionData {
  errors?: {
    email?: string;
    password?: string;
  };
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const redirectTo = safeRedirect(
    formData.get("redirectTo"),
    urlPath.BILLS_LIST
  );
  const remember = formData.get("remember");

  const { emailError } = validateEmail(email);
  if (emailError) {
    return json<ActionData>({ errors: { email: emailError } }, { status: 400 });
  }

  const { passwordError } = validatePassword(password);
  if (passwordError) {
    return json<ActionData>(
      { errors: { password: passwordError } },
      { status: 400 }
    );
  }

  const user = await verifyLogin(email, password);

  if (!user) {
    return json<ActionData>(
      { errors: { email: "Invalid email or password" } },
      { status: 400 }
    );
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: remember === "on" ? true : false,
    redirectTo,
  });
};

export const meta: MetaFunction = () => {
  return {
    title: "Login",
  };
};

export default function LoginPage() {
  const methods = useForm<{
    email: string;
    password: string;
  }>();

  return (
    <BackgroundContainer>
      <Form>
        <FormProvider {...methods}>
          <LoginForm />
        </FormProvider>
      </Form>
    </BackgroundContainer>
  );
}
