import { useState, useEffect, useMemo } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  FlexProps,
  Heading,
  Skeleton,
  Stack,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";

import { ILayout } from "../MakeTeam/types";
import useLayouts from "../../domain/layout/useLayouts";
import useRemoveLayout from "../../dal/layout/useRemoveLayout";
import { hasReachedMaxNumber } from "../../domain/layout";
import CreateLayoutButton from "../../components/CreateLayoutButton";
import RemoveLayoutButton from "../../components/RemoveLayoutButton";

import RadioGroup from "./RadioGroup";
import Select from "./Select";

export interface IProps extends Omit<FlexProps, "onChange"> {
  onChange: (layout: ILayout) => void;
}

export default function TeamLayout({ onChange, ...restProps }: IProps) {
  const toast = useToast();
  const { layouts, isLoading } = useLayouts();
  const [selectedId, setSelectedId] = useState<string>();
  const isLargeBreakpoint = useBreakpointValue({ base: true, lg: false });
  const {
    mutateAsync: removeLayout,
    isLoading: isRemoveLoading,
  } = useRemoveLayout();

  const selected = useMemo(() => layouts.find((l) => l.id === selectedId), [
    layouts,
    selectedId,
  ]);

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
    if (layouts.length && !selectedId) {
      const hasUserLayouts = layouts.some((layout) => layout.isCustom);
      if (hasUserLayouts) {
        // If the user has its own layouts then select the first custom layout
        const firstCustomLayout = layouts.find((layout) => layout.isCustom);
        setSelectedId(firstCustomLayout?.id);
      } else {
        // If not then select the first default layout
        setSelectedId(layouts[0].id);
      }
    }
  }, [layouts, selectedId]);

  const defaultLayouts = useMemo(() => {
    return layouts.filter((layout) => !layout.isCustom);
  }, [layouts]);

  const customLayouts = useMemo(() => {
    return layouts.filter((layout) => layout.isCustom);
  }, [layouts]);

  function handleChange(nextValue: string) {
    const layout = layouts.find((l) => l.id === nextValue);
    if (layout) {
      setSelectedId(layout.id);
    }
  }

  async function handleLayoutRemoved(layout: ILayout) {
    try {
      await removeLayout(layout);
      toast({
        title: "Layout removed.",
        description: `The layout ${layout.name} was removed successfully.`,
        status: "success",
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: "An error occured.",
        description: `While trying to remove the layout ${layout.name}.`,
        status: "error",
        isClosable: true,
      });
    }

    // If the removed layout was selected, clear the `selected` state so that we
    // can autoselect again the first layout in the list
    if (layout.id === selected?.id) {
      setSelectedId(undefined);
    }
  }

  return (
    <Flex {...restProps} h="100%" direction="column" justify="space-between">
      <Heading as="h4" fontSize="md" mb={6}>
        Layouts
      </Heading>

      {isLoading || isRemoveLoading || (layouts.length && !selected) ? (
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
          flex={1}
          overflow="auto"
          selected={selected!}
          defaultLayouts={defaultLayouts}
          customLayouts={customLayouts}
          onChange={handleChange}
          onRemoved={handleLayoutRemoved}
        />
      )}
      <Box data-testid="layout-buttons" mt={6}>
        {hasReachedMaxNumber(layouts) && (
          <Alert status="warning" mb={4}>
            <AlertIcon />
            You've reached the max number of layouts.
          </Alert>
        )}
        <CreateLayoutButton disabled={hasReachedMaxNumber(layouts)}>
          New
        </CreateLayoutButton>
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
