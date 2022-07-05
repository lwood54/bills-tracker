import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import * as React from "react";
import type { FieldError } from "react-hook-form";

interface FormInputProps {
  error?: FieldError | { message?: string };
  id: string;
  label?: string;
  placeholder?: string;
  spacing?: string;
  type?: "text" | "number" | "email" | "password";
  labelColor?: string;
}

const FormInput: React.FC<FormInputProps> = React.forwardRef(
  (
    {
      error,
      id,
      label,
      placeholder,
      labelColor = "white",
      spacing = "0",
      type = "text",
      ...rest
    },
    ref
  ) => {
    return (
      <FormControl isInvalid={Boolean(error?.message)}>
        <Stack direction="column" spacing={spacing} alignItems="flex-start">
          {label && (
            <FormLabel color={labelColor} htmlFor={id} m="0">
              {label}
            </FormLabel>
          )}
          <Input
            cursor="pointer"
            border="1px"
            borderColor="gray.800"
            _placeholder={{ color: "gray.500" }}
            color="gray.900"
            _hover={{ borderColor: "blue.200" }}
            bgColor="gray.200"
            rounded="sm"
            ref={ref as React.LegacyRef<HTMLInputElement>}
            id={id}
            type={type}
            placeholder={placeholder}
            {...rest}
          />
          <FormErrorMessage color="red.800">
            {error && error.message}
          </FormErrorMessage>
        </Stack>
      </FormControl>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
