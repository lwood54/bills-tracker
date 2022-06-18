import * as React from "react";
import type { LinksFunction } from "@remix-run/node";
import styles from "./styles.css";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

interface NavBarProps {
  children?: React.ReactNode;
}
const NavBar: React.FC<NavBarProps> = ({ children }) => {
  return (
    <>
      <h1>nav stuff</h1>
      <p>other nave things</p>
      <div>{children}</div>
    </>
  );
};

export default NavBar;
