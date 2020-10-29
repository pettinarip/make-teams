import {
  Box,
  Divider,
  Radio,
  RadioGroup as RadioGroupUI,
  RadioGroupProps,
  Stack,
} from "@chakra-ui/core";

import RemoveLayoutButton from "../../components/RemoveLayoutButton";
import { ILayout } from "../MakeTeam/types";

interface IProps extends Omit<RadioGroupProps, "children"> {
  selected: ILayout;
  defaultLayouts: Array<ILayout>;
  customLayouts: Array<ILayout>;
  onChange: (nextValue: string) => void;
  onRemoved: (layout: ILayout) => void;
}

export default function RadioGroup({
  selected,
  defaultLayouts,
  customLayouts,
  onChange,
  onRemoved,
  ...restProps
}: IProps) {
  return (
    <RadioGroupUI onChange={onChange} value={selected?.id} {...restProps}>
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
            onRemoved={onRemoved}
            opacity={0}
            _groupHover={{ opacity: 1 }}
          />
        </Box>
      ))}
    </RadioGroupUI>
  );
}
