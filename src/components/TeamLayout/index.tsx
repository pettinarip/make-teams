import React, { FormEvent } from "react";
import { Form, Radio, CheckboxProps, Header } from "semantic-ui-react";

import { ILayout } from "../../containers/MakeTeam/types";

export interface IProps {
  layouts: Array<ILayout>;
  selected: ILayout;
  onChange: (layout: ILayout) => void;
}

export default function TeamLayout({ layouts, selected, onChange }: IProps) {
  function handleChange(e: FormEvent, { value }: CheckboxProps) {
    const selectedLayout = layouts.find(l => l.id === value);
    if (selectedLayout) {
      onChange(selectedLayout);
    }
  }

  return (
    <>
      <Header as="h2">Layout</Header>
      <Form>
        {layouts.map(layout => (
          <Form.Field key={layout.id}>
            <Radio
              label={layout.name}
              name="layout"
              value={layout.id}
              checked={selected.id === layout.id}
              onChange={handleChange}
            />
          </Form.Field>
        ))}
      </Form>
    </>
  );
}
