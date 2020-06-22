import React, { FormEvent, useState, useEffect } from "react";
import {
  Form,
  Radio,
  CheckboxProps,
  Header,
  Placeholder,
  Button,
  Divider,
} from "semantic-ui-react";

import { ILayout } from "../MakeTeam/types";
import useLayouts from "../../domain/Layout/useLayouts";
import useAuth from "../../components/ProtectedRoute/useAuth";

export interface IProps {
  onChange: (layout: ILayout) => void;
  onCreate: () => void;
  onSave: (name: string) => void;
  onCancel: () => void;
}

export default function TeamLayout({
  onChange,
  onCreate,
  onSave,
  onCancel,
}: IProps) {
  const { user = {}, isLoading } = useAuth();
  const { status, layouts } = useLayouts(user);
  const [selected, setSelected] = useState<ILayout>();
  const [creating, setCreating] = useState(false);

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

  function handleCreate() {
    setCreating(true);
    onCreate();
  }

  function handleCancel() {
    setCreating(false);
    onCancel();
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
        {creating ? (
          <>
            <Button positive onClick={onSave as any}>
              Add
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </>
        ) : (
          <Button primary onClick={handleCreate}>
            New
          </Button>
        )}
      </div>
    </>
  );
}
