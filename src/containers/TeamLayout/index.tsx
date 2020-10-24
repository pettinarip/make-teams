import { useState, useEffect, useMemo } from "react";
import {
  Box,
  ChakraProps,
  Divider,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Skeleton,
  Stack,
} from "@chakra-ui/core";

import { ILayout } from "../MakeTeam/types";
import useLayouts from "../../domain/layout/useLayouts";
import CreateLayoutButton from "../../components/CreateLayoutButton";
import RemoveLayoutButton from "../../components/RemoveLayoutButton";

export interface IProps extends ChakraProps {
  onChange: (layout: ILayout) => void;
}

export default function TeamLayout({ onChange, ...restProps }: IProps) {
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
      ) : (
        <RadioGroup
          onChange={handleChange}
          value={selected?.id}
          overflow="auto"
        >
          <Stack data-testid="layouts">
            {defaultLayouts.map((layout) => (
              <Box key={layout.id} data-testid="layout">
                <Radio id={`layout-${layout.id}`} value={layout.id} mb={2}>
                  {layout.name}
                </Radio>
              </Box>
            ))}
          </Stack>

          {customLayouts.length > 0 && <Divider />}

          {customLayouts.map((layout) => (
            <Box
              key={layout.id}
              role="group"
              d="flex"
              data-testid="custom-layout"
              flexDirection="row"
              justifyContent="space-between"
              my={2}
            >
              <Radio id={`layout-${layout.id}`} value={layout.id}>
                {layout.name}
              </Radio>
              <RemoveLayoutButton
                layout={layout}
                onRemoved={handleLayoutRemoved}
                opacity={0}
                _groupHover={{ opacity: 1 }}
              />
            </Box>
          ))}
        </RadioGroup>
      )}
      <Box data-testid="layout-buttons" mt={6}>
        <CreateLayoutButton>New</CreateLayoutButton>
      </Box>
    </Flex>
  );
}
