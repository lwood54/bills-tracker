import { Form } from "@remix-run/react";
import * as React from "react";
import Button, { BTN } from "~/components/Button";

const Delete: React.FC = () => {
  return (
    <Form method="post">
      <input hidden readOnly value="delete" name="action_type" />
      <Button label="Delete" variant={BTN.DELETE} />
    </Form>
  );
};

export default Delete;
