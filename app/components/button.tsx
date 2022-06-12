import * as React from "react";

export const BTN = {
  DELETE: "DELETE",
  EDIT: "EDIT",
  STANDARD: "STANDARD",
  SAVE: "SAVE",
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
  const buttonClass = React.useMemo(() => {
    let baseClass = "rounded py-2 px-4 text-white";
    switch (variant) {
      case BTN.SAVE:
        return (baseClass = `${baseClass} bg-emerald-600 hover:bg-emerald-800 focus:bg-emerald-400`);
      case BTN.EDIT:
        return (baseClass = `${baseClass} bg-cyan-600 hover:bg-cyan-800 focus:bg-cyan-400`);
      case BTN.DELETE:
        return (baseClass = `${baseClass} bg-red-600 hover:bg-red-800 focus:bg-red-400`);
      case BTN.STANDARD:
        return "";
    }
  }, [variant]);

  return (
    <button
      type={onClick ? "button" : "submit"}
      onClick={onClick}
      className={buttonClass}
    >
      {label}
    </button>
  );
};

export default Button;
