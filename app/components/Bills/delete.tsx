import { Form } from "@remix-run/react";
import * as React from "react";

interface DeleteProps {
  children: React.ReactNode;
}

const Delete: React.FC<DeleteProps> = ({ children }) => {
  return (
    <Form method="post">
      <input hidden readOnly value="delete" name="action_type" />
      {children}
    </Form>
  );
};

export default Delete;
