import { Link } from "@remix-run/react";
import { Box, Heading, Stack } from "@chakra-ui/react";
import { useOptionalUser } from "~/utils";
import ButtonBase, { BTN } from "~/components/ButtonBase/button-base";
import { urlPath } from "~/constants/url-paths";
import { BackgroundContainer } from "~/components/BackgroundContainer";

export default function Index() {
  const user = useOptionalUser();
  return (
    <main>
      <BackgroundContainer>
        {user ? (
          <Link to="/bills">View Bills for {user.email}</Link>
        ) : (
          <Stack
            alignItems="center"
            justifyContent="flex-start"
            p="4"
            gap="100px"
          >
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
        )}
      </BackgroundContainer>
    </main>
  );
}
