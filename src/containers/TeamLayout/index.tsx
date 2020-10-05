import { FormEvent, useState, useEffect, useMemo } from "react";
import {
  Box,
  Divider,
  Heading,
  Radio,
  RadioGroup,
  Skeleton,
} from "@chakra-ui/core";

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

  function handleChange(nextValue: string) {
    const layout = layouts.find((l) => l.id === nextValue);
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
    <Box>
      <Heading as="h4" size="md" mb={6}>
        Layouts
      </Heading>

      <Skeleton
        isLoaded={status !== "loading" || (!!layouts.length && !!selected)}
        data-testid="loading"
      >
        <RadioGroup onChange={handleChange} value={selected?.id}>
          <Box data-testid="layouts">
            {defaultLayouts.map((layout) => (
              <Radio
                key={layout.id}
                id={`layout-${layout.id}`}
                value={layout.id}
                data-testid="layout"
              >
                {layout.name}
              </Radio>
            ))}
          </Box>

          {customLayouts.length > 0 && <Divider my={4} />}

          <Box data-testid="custom-layout">
            {customLayouts.map((layout) => (
              <Radio
                key={layout.id}
                id={`layout-${layout.id}`}
                name="layout"
                value={layout.id}
              >
                {layout.name}
              </Radio>
              // <RemoveLayoutButton
              //   layout={layout}
              //   onRemoved={handleLayoutRemoved}
              // />
            ))}
          </Box>
        </RadioGroup>
      </Skeleton>
      <Box data-testid="layout-buttons" my={6}>
        <CreateLayoutButton>New</CreateLayoutButton>
      </Box>
    </Box>
  );
}
