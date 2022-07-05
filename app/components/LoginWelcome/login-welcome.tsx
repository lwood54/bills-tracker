import { Heading, Stack } from "@chakra-ui/react";
import { Link } from "@remix-run/react";
import * as React from "react";
import { urlPath } from "~/constants/url-paths";
import ButtonBase, { BTN } from "../ButtonBase/button-base";

interface LoginWelcomeProps {
  children?: React.ReactNode;
}
const LoginWelcome: React.FC<LoginWelcomeProps> = ({ children }) => {
  return (
    <Stack alignItems="center" justifyContent="flex-start" p="4" gap="100px">
      <Stack direction="column">
        <Heading as="h3" size="lg" textAlign="center">
          Welcome to
        </Heading>
        <Heading as="h2" size="3xl" noOfLines={1} textAlign="center">
          The Bills IO
        </Heading>
      </Stack>
      <Stack w="100%" gap="32px" maxW={800}>
        <Link to={urlPath.LOGIN}>
          <ButtonBase size="full">Log In</ButtonBase>
        </Link>
        <Link to={urlPath.SIGNUP}>
          <ButtonBase size="full" variant={BTN.SECONDARY}>
            Sign Up
          </ButtonBase>
        </Link>
      </Stack>
    </Stack>
  );
};

export default LoginWelcome;
