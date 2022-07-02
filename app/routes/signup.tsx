import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import * as React from "react";

import { getUserId, createUserSession } from "~/session.server";

import { createUser, getUserByEmail } from "~/models/user.server";
import { safeRedirect, validateEmail, validatePassword } from "~/utils";
import { urlPath } from "~/constants/url-paths";
import { BackgroundContainer } from "~/components/BackgroundContainer";
import { FormProvider, useForm } from "react-hook-form";
import { LoginForm } from "~/components/LoginForm";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

interface ActionData {
  errors: {
    email?: string;
    password?: string;
  };
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const redirectTo = safeRedirect(formData.get("redirectTo"), urlPath.ROOT);

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

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return json<ActionData>(
      { errors: { email: "A user already exists with this email" } },
      { status: 400 }
    );
  }

  const user = await createUser(email, password);

  return createUserSession({
    request,
    userId: user.id,
    remember: false,
    redirectTo,
  });
};

export const meta: MetaFunction = () => {
  return {
    title: "Sign Up",
  };
};

export default function Signup() {
  const methods = useForm<{
    email: string;
    password: string;
  }>();

  return (
    <BackgroundContainer>
      <Form>
        <FormProvider {...methods}>
          <LoginForm isLogin={false} />
        </FormProvider>
      </Form>
    </BackgroundContainer>
  );
}
