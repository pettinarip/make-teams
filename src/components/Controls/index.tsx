import React from "react";
import { Form, Checkbox } from "semantic-ui-react";

export interface IProps {
  showNames: boolean;
  onShowNamesChange: () => void;
}

export default function Controls(props: IProps) {
  return (
    <Form>
      <Form.Field>
        <Checkbox
          toggle
          id="show-names"
          label="Show names"
          checked={props.showNames}
          onChange={props.onShowNamesChange}
        />
      </Form.Field>
    </Form>
  );
}
