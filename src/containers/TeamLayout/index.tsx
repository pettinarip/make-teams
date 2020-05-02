import React, { FormEvent, useState, useEffect } from "react";
import {
  Form,
  Radio,
  CheckboxProps,
  Header,
  Placeholder,
} from "semantic-ui-react";

import { ILayout } from "../MakeTeam/types";
import useLayouts from "../../domain/Layout/useLayouts";

export interface IProps {
  onChange: (layout: ILayout) => void;
}

export default function TeamLayout({ onChange }: IProps) {
  const { status, layouts } = useLayouts();
  const [selected, setSelected] = useState<ILayout>();

  useEffect(() => {
    if (selected) {
      onChange(selected);
    }
  }, [selected]);

  useEffect(() => {
    if (layouts.length) {
      setSelected(layouts[0]);
    }
  }, [layouts]);

  function handleChange(e: FormEvent, { value }: CheckboxProps) {
    const layout = layouts.find((l) => l.id === value);
    if (layout) {
      setSelected(layout);
    }
  }

  return (
    <>
      <Header as="h2">Layout</Header>
      {status === "loading" ? (
        <Placeholder fluid>
          <Placeholder.Paragraph>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Paragraph>
        </Placeholder>
      ) : (
        <Form>
          {layouts.map((layout) => (
            <Form.Field key={layout.id}>
              <Radio
                label={layout.name}
                name="layout"
                value={layout.id}
                checked={selected && selected.id === layout.id}
                onChange={handleChange}
              />
            </Form.Field>
          ))}
        </Form>
      )}
    </>
  );
}
