import React, { FormEvent, useState, useEffect } from "react";
import {
  Form,
  Radio,
  CheckboxProps,
  Header,
  Placeholder,
  Divider,
} from "semantic-ui-react";

import { ILayout } from "../MakeTeam/types";
import useLayouts from "../../domain/Layout/useLayouts";
import useAuth from "../../components/ProtectedRoute/useAuth";
import CreateLayoutButton from "../../components/CreateLayoutButton";

export interface IProps {
  onChange: (layout: ILayout) => void;
}

export default function TeamLayout({ onChange }: IProps) {
  const { user = {}, isLoading } = useAuth();
  const { status, layouts } = useLayouts(user);
  const [selected, setSelected] = useState<ILayout>();

  // TODO: refactor, move all the layouts fetch to an upper level and avoid
  // doing this dirty stuff
  useEffect(() => {
    if (selected) {
      onChange(selected);
    }
  }, [selected, onChange]);

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
      {isLoading || status === "loading" || (layouts.length && !selected) ? (
        <Placeholder fluid data-testid="loading">
          <Placeholder.Paragraph>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Paragraph>
        </Placeholder>
      ) : (
        <Form data-testid="layouts">
          {layouts.map((layout) => (
            <Form.Field key={layout.id}>
              <Radio
                id={`layout-${layout.id}`}
                name="layout"
                data-testid="layout"
                label={{
                  children: layout.name,
                  htmlFor: `layout-${layout.id}`,
                }}
                value={layout.id}
                checked={selected && selected.id === layout.id}
                onChange={handleChange}
              />
            </Form.Field>
          ))}
        </Form>
      )}
      <Divider />
      <div data-testid="layout-buttons">
        <CreateLayoutButton>New</CreateLayoutButton>
      </div>
    </>
  );
}
