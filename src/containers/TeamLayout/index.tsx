import React, { FormEvent, useState, useEffect, useMemo } from "react";
import {
  Form,
  Radio,
  CheckboxProps,
  Header,
  Placeholder,
  Divider,
} from "semantic-ui-react";

import { ILayout } from "../MakeTeam/types";
import useLayouts from "../../domain/layout/useLayouts";
import CreateLayoutButton from "../../components/CreateLayoutButton";
import RemoveLayoutButton from "../../components/RemoveLayoutButton";

export interface IProps {
  onChange: (layout: ILayout) => void;
}

export default function TeamLayout({ onChange }: IProps) {
  const { status, layouts } = useLayouts();
  const [selected, setSelected] = useState<ILayout>();

  // TODO: refactor, move all the layouts fetch to an upper level and avoid
  // doing this dirty auto-select workaround
  useEffect(() => {
    if (selected) {
      onChange(selected);
    }
  }, [selected, onChange]);

  useEffect(() => {
    // Only autoselect the first layout in the list on the first load (when
    // there is no layout selected)
    if (layouts.length && !selected) {
      const hasUserLayouts = layouts.some((layout) => layout.isCustom);
      if (hasUserLayouts) {
        // If the user has its own layouts then select the first custom layout
        const firstCustomLayout = layouts.find((layout) => layout.isCustom);
        setSelected(firstCustomLayout);
      } else {
        // If not then select the first default layout
        setSelected(layouts[0]);
      }
    }
  }, [layouts, selected]);

  const defaultLayouts = useMemo(() => {
    return layouts.filter((layout) => !layout.isCustom);
  }, [layouts]);

  const customLayouts = useMemo(() => {
    return layouts.filter((layout) => layout.isCustom);
  }, [layouts]);

  function handleChange(e: FormEvent, { value }: CheckboxProps) {
    const layout = layouts.find((l) => l.id === value);
    if (layout) {
      setSelected(layout);
    }
  }

  function handleLayoutRemoved(layout: ILayout) {
    // If the removed layout was selected, clear the `selected` state so that we
    // can autoselect again the first layout in the list
    if (layout.id === selected?.id) {
      setSelected(undefined);
    }
  }

  return (
    <>
      <Header as="h2">Layout</Header>
      {status === "loading" || (layouts.length && !selected) ? (
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
          {defaultLayouts.map((layout) => (
            <Form.Field key={layout.id} data-testid="layout">
              <Radio
                id={`layout-${layout.id}`}
                name="layout"
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

          {customLayouts.length > 0 && <Divider />}

          {customLayouts.map((layout) => (
            <Form.Field key={layout.id} data-testid="custom-layout">
              <Radio
                id={`layout-${layout.id}`}
                name="layout"
                label={{
                  children: layout.name,
                  htmlFor: `layout-${layout.id}`,
                }}
                value={layout.id}
                checked={selected && selected.id === layout.id}
                onChange={handleChange}
              />
              <RemoveLayoutButton
                layout={layout}
                onRemoved={handleLayoutRemoved}
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
