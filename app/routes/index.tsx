import * as React from "react";
import { Link } from "@remix-run/react";
import { Button } from "@chakra-ui/react";
import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();
  return (
    <main>
      {user ? (
        <Link to="/bills">View Bills for {user.email}</Link>
      ) : (
        <div>
          <Button>
            <Link to="/login">Log In</Link>
          </Button>
          <Button>
            <Link to="/signup">Sign up</Link>
          </Button>
        </div>
      )}
    </main>
  );
}
