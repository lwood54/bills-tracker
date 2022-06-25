import * as React from "react";
import { Form, NavLink } from "@remix-run/react";
import type { User } from "@prisma/client";
import { urlPath } from "~/constants/url-paths";

interface NavBarProps {
  children?: React.ReactNode;
  user: User;
}
const NavBar: React.FC<NavBarProps> = ({ user }) => {
  return (
    <>
      <header className="nav-bar">
        <div className="nav-links-container">
          <NavLink
            className={({ isActive }) =>
              `nav-link ${isActive && "nav-selected"}`
            }
            to={urlPath.ROOT}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `nav-link ${isActive && "nav-selected"}`
            }
            to={urlPath.BILLS}
          >
            Bills
          </NavLink>
        </div>
        <p className="nav-title">{user.email}</p>
        <div className="nav-logout-container">
          <Form action="/logout" method="post">
            <button type="submit" className="nav-logout">
              Logout
            </button>
          </Form>
        </div>
      </header>
    </>
  );
};

export default NavBar;
