import { Box, Container, HStack, Stack, Text } from "@chakra-ui/react";
import { Link, useSearchParams, useSubmit } from "@remix-run/react";
import * as React from "react";
import { useFormContext } from "react-hook-form";
import { VALIDATION } from "~/constants/bills";
import { urlPath } from "~/constants/url-paths";
import { dataToFormData } from "~/helpers/conversions";
import ButtonBase from "../ButtonBase/button-base";
import { FormInput } from "../FormInput";

interface LoginFormProps {
  children?: React.ReactNode;
  isLogin?: boolean;
}
const LoginForm: React.FC<LoginFormProps> = ({ isLogin = true }) => {
  const { register, handleSubmit, formState } = useFormContext<{
    email: string;
    password: string;
  }>();
  const [searchParams] = useSearchParams();
  const submit = useSubmit();
  const redirectTo = searchParams.get("redirectTo") || urlPath.BILLS_LIST;
  const { errors } = formState;

  const handleLogin = (data: { email: string; password: string }) => {
    submit(dataToFormData(data), { method: "post" });
  };

  return (
    <>
      <Container>
        <Stack spacing="8">
          <Stack>
            <FormInput
              id="email"
              error={errors?.email}
              {...register("email", {
                required: VALIDATION.REQUIRED,
              })}
              placeholder="name@email.com"
              label="Email"
            />
            <FormInput
              id="password"
              type="password"
              error={errors?.password}
              {...register("password", {
                required: VALIDATION.REQUIRED,
              })}
              label="Password"
            />
          </Stack>
          <Stack w="full" justifyContent="flex-end">
            <Box w="full" justifyContent="flex-end" display="flex">
              <ButtonBase onClick={handleSubmit(handleLogin)} type="submit">
                {isLogin ? "Log In" : "Sign Up"}
              </ButtonBase>
            </Box>
            <HStack justifyContent="flex-end">
              <Text>{isLogin ? "Don't" : "Already"} have an account?</Text>
              <Link
                to={{
                  pathname: isLogin ? urlPath.SIGNUP : urlPath.LOGIN,
                  search: searchParams.toString(),
                }}
              >
                <Text
                  color="blue.700"
                  fontWeight="semibold"
                  _hover={{ color: "blue.900" }}
                  _active={{ color: "blue.500" }}
                >
                  {isLogin ? "Sign Up" : "Log In"}
                </Text>
              </Link>
            </HStack>
          </Stack>
        </Stack>
      </Container>
      <input type="hidden" name="redirectTo" value={redirectTo} />
    </>
  );
};

export default LoginForm;
