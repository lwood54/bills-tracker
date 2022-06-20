import type { LinksFunction } from "@remix-run/node";
import * as React from "react";
import styles from "./styles.css";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export const BTN = {
  DELETE: "delete",
  EDIT: "edit",
  STANDARD: "standard",
  SAVE: "save",
} as const;
export type ButtonType = typeof BTN[keyof typeof BTN];

interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: ButtonType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = BTN.STANDARD,
}) => {
  return (
    <button
      type={onClick ? "button" : "submit"}
      onClick={onClick}
      className={`button ${variant}`}
    >
      {label}
    </button>
  );
};

export default Button;
