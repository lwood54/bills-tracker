import * as React from "react";
import { Form, NavLink, useLocation } from "@remix-run/react";
import type { User } from "@prisma/client";
import { urlPath } from "~/constants/url-paths";
import { Box, Button, Stack, Text } from "@chakra-ui/react";
import useBreakpoints, { BP, BP_VALUES } from "~/hooks/use-breakpoints";

interface NavBarProps {
  children?: React.ReactNode;
  user: User;
}
const NavBar: React.FC<NavBarProps> = ({ user }) => {
  const navRef = React.useRef({} as HTMLDivElement);
  const { pathname } = useLocation();
  const [active, setActive] = React.useState("");
  const size = useBreakpoints(navRef, BP_VALUES);

  React.useEffect(() => {
    setActive(pathname);
  }, [pathname]);

  return (
    <Box
      w="full"
      display="flex"
      justifyContent="space-between"
      p="4"
      alignItems="center"
      ref={navRef}
    >
      <Stack direction="row">
        <NavLink to={urlPath.ROOT}>
          <Button
            rounded="sm"
            bgColor="rgba(0,0,0,0)"
            borderBottom="4px"
            borderColor={active === urlPath.ROOT ? "teal.800" : "rgba(0,0,0,0)"}
            _hover={{ bg: "teal.400" }}
            color="teal.900"
          >
            Home
          </Button>
        </NavLink>
        <NavLink to={urlPath.BILLS_LIST}>
          <Button
            rounded="sm"
            bgColor="rgba(0,0,0,0)"
            borderBottom="4px"
            borderColor={
              active === urlPath.BILLS_LIST ? "teal.800" : "rgba(0,0,0,0)"
            }
            _hover={{ bg: "teal.400" }}
            color="teal.900"
          >
            Bills
          </Button>
        </NavLink>
      </Stack>
      {size !== BP.sm ? <Text color="white">{user.email}</Text> : null}
      <Form action="/logout" method="post">
        <Button
          rounded="sm"
          type="submit"
          bgColor="rgba(0,0,0,0)"
          borderBottom="4px"
          borderColor="rgba(0,0,0,0)"
          _hover={{ bg: "teal.400" }}
          color="teal.900"
        >
          Logout
        </Button>
      </Form>
    </Box>
  );
};

export default NavBar;
