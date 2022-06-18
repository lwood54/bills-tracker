import { Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();
  return (
    <main>
      {user ? (
        <Link to="/bills">View Bills for {user.email}</Link>
      ) : (
        <div>
          <Link to="/signup">Sign up</Link>
          <Link to="/login">Log In</Link>
        </div>
      )}
    </main>
  );
}
