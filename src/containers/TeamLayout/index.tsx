import { useState, useEffect, useMemo } from "react";
import {
  Box,
  ChakraProps,
  Flex,
  Heading,
  Skeleton,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/core";

import { ILayout } from "../MakeTeam/types";
import useLayouts from "../../domain/layout/useLayouts";
import CreateLayoutButton from "../../components/CreateLayoutButton";
import RemoveLayoutButton from "../../components/RemoveLayoutButton";

import RadioGroup from "./RadioGroup";
import Select from "./Select";

export interface IProps extends ChakraProps {
  onChange: (layout: ILayout) => void;
}

export default function TeamLayout({ onChange, ...restProps }: IProps) {
  const { status, layouts } = useLayouts();
  const [selected, setSelected] = useState<ILayout>();
  const isLargeBreakpoint = useBreakpointValue({ base: true, lg: false });

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
    <Flex {...restProps} h="100%" direction="column" justify="space-between">
      <Heading as="h4" fontSize="md" mb={6}>
        Layouts
      </Heading>

      {status === "loading" || (layouts.length && !selected) ? (
        <Stack data-testid="loading">
          <Skeleton height={6} />
          <Skeleton height={6} />
          <Skeleton height={6} />
        </Stack>
      ) : isLargeBreakpoint ? (
        <Select
          selected={selected!}
          defaultLayouts={defaultLayouts}
          customLayouts={customLayouts}
          onChange={handleChange}
        />
      ) : (
        <RadioGroup
          selected={selected!}
          defaultLayouts={defaultLayouts}
          customLayouts={customLayouts}
          onChange={handleChange}
          onRemoved={handleLayoutRemoved}
        />
      )}
      <Box data-testid="layout-buttons" mt={6}>
        <CreateLayoutButton>New</CreateLayoutButton>
        {selected && isLargeBreakpoint && (
          <RemoveLayoutButton
            ml={3}
            variant="solid"
            layout={selected}
            onRemoved={handleLayoutRemoved}
          />
        )}
      </Box>
    </Flex>
  );
}
