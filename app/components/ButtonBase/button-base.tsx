import { Button } from "@chakra-ui/react";
import * as React from "react";

export const BTN = {
  INACTIVE: "INACTIVE",
  NEGATIVE: "NEGATIVE",
  POSITIVE: "POSITIVE",
  SECONDARY: "SECONDARY",
} as const;
export type btnType = typeof BTN[keyof typeof BTN];

export const BTN_STATE = {
  ACTIVE: "ACTIVE",
  BASE: "BASE",
  FOCUS: "FOCUS",
  FONT: "FONT",
  HOVER: "HOVER",
  BORDER_BOTTOM: "BORDER_BOTTOM",
} as const;
export type btnState = typeof BTN_STATE[keyof typeof BTN_STATE];

interface ButtonProps {
  children?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: btnType;
  size?: "sm" | "md" | "lg" | "full";
}
const ButtonBase: React.FC<ButtonProps> = ({
  children,
  onClick,
  isLoading,
  disabled,
  size = "md",
  type = "button",
  variant = BTN.POSITIVE,
}) => {
  const getColorBase = (v: btnType): string => {
    switch (v) {
      case BTN.INACTIVE:
        return "gray";
      case BTN.NEGATIVE:
        return "red";
      case BTN.POSITIVE:
        return "cyan";
      case BTN.SECONDARY:
        return "teal";
    }
  };

  const getColorVariant = (state: btnState) => {
    switch (state) {
      case BTN_STATE.ACTIVE:
        return `${getColorBase(variant)}.800`;
      case BTN_STATE.BASE:
        return `${getColorBase(variant)}.600`;
      case BTN_STATE.FOCUS:
        return `${getColorBase(variant)}.800`;
      case BTN_STATE.HOVER:
        return `${getColorBase(variant)}.300`;
      case BTN_STATE.BORDER_BOTTOM:
        return `${getColorBase(variant)}.900`;
    }
  };

  const getFontColor = (v: btnType): string => {
    switch (v) {
      case BTN.INACTIVE:
        return "gray.900";
      case BTN.NEGATIVE:
        return "white";
      case BTN.POSITIVE:
        return "white";
      case BTN.SECONDARY:
        return "white";
    }
  };

  const getSize = (s: "sm" | "md" | "lg" | "full"): string => {
    switch (s) {
      case "sm":
        return "75px";
      case "md":
        return "100px";
      case "lg":
        return "200px";
      case "full":
        return "100%";
    }
  };

  return (
    <Button
      type={type}
      isLoading={isLoading}
      disabled={disabled}
      rounded="sm"
      bgColor={getColorVariant(BTN_STATE.BASE)}
      _hover={{ bg: getColorVariant(BTN_STATE.HOVER) }}
      _active={{ bg: getColorVariant(BTN_STATE.ACTIVE) }}
      _focus={{ bg: getColorVariant(BTN_STATE.FOCUS) }}
      borderBottomColor={getColorVariant(BTN_STATE.BORDER_BOTTOM)}
      borderBottomWidth="4px"
      color={getFontColor(variant)}
      size="lg"
      w={getSize(size)}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default ButtonBase;
