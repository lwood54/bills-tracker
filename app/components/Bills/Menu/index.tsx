import type { Bill } from "@prisma/client";
import type { LinksFunction } from "@remix-run/node";
import { Link, NavLink } from "@remix-run/react";
import * as React from "react";
import { urlPath } from "~/constants/url-paths";
import styles from "./styles.css";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

interface MenuProps {
  children?: React.ReactNode;
  bills: Bill[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
const Menu: React.FC<MenuProps> = ({ bills, isOpen, setIsOpen }) => {
  return (
    <div className={`menu-container ${isOpen ? "show" : "hide"}`}>
      <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
        |x|
      </div>
      <Link className="new-item" to={urlPath.BILLS_ADD}>
        + New Bill
      </Link>
      {bills?.length === 0 ? (
        <p className="p-4">No bills yet</p>
      ) : (
        <ol>
          {bills?.map((bill) => (
            <li key={bill.id}>
              <NavLink
                className={({ isActive }) =>
                  `menu-item ${isActive && "selected"}`
                }
                to={`../${urlPath.BILLS}/${bill.id}`}
              >
                {bill.title}
              </NavLink>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default Menu;
