import * as React from "react";
import { Form, NavLink } from "@remix-run/react";
import type { User } from "@prisma/client";
import { urlPath } from "~/constants/url-paths";
import { Box, Button, Stack, Text } from "@chakra-ui/react";
import useResize from "~/hooks/use-resize";

interface NavBarProps {
  children?: React.ReactNode;
  user: User;
}
const NavBar: React.FC<NavBarProps> = ({ user }) => {
  const { width } = useResize(100);

  return (
    <Box
      w="full"
      display="flex"
      justifyContent="space-between"
      p="4"
      bg="teal.600"
      alignItems="center"
    >
      <Stack direction="row">
        <NavLink to={urlPath.ROOT}>
          <Button
            rounded="sm"
            bgColor="blue.300"
            _hover={{ bg: "blue.200" }}
            _active={{ bg: "blue.400" }}
            _focus={{ bg: "blue.400" }}
            color="teal.800"
          >
            Home
          </Button>
        </NavLink>
        <NavLink to={urlPath.BILLS}>
          <Button
            rounded="sm"
            bgColor="blue.300"
            _hover={{ bg: "blue.200" }}
            _active={{ bg: "blue.400" }}
            _focus={{ bg: "blue.400" }}
            color="teal.800"
          >
            Bills
          </Button>
        </NavLink>
      </Stack>
      {width > 550 ? <Text color="white">{user.email}</Text> : null}
      <Form action="/logout" method="post">
        <Button
          rounded="sm"
          bgColor="blue.300"
          _hover={{ bg: "blue.200" }}
          _active={{ bg: "blue.400" }}
          _focus={{ bg: "blue.400" }}
          color="teal.800"
          type="submit"
        >
          Logout
        </Button>
      </Form>
    </Box>
  );
};

export default NavBar;
