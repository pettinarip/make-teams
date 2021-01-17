import { Select as SelectUI } from "@chakra-ui/react";

import { ILayout } from "../MakeTeam/types";

interface IProps {
  selected: ILayout;
  defaultLayouts: Array<ILayout>;
  customLayouts: Array<ILayout>;
  onChange: (nextValue: string) => void;
}

export default function RadioGroup({
  selected,
  defaultLayouts,
  customLayouts,
  onChange,
}: IProps) {
  return (
    <SelectUI
      onChange={(e) => {
        onChange(e.target.value);
      }}
      value={selected?.id}
      data-testid="layouts"
    >
      {defaultLayouts.map((layout) => (
        <option key={layout.id} value={layout.id}>
          {layout.name}
        </option>
      ))}

      {customLayouts.map((layout) => (
        <option key={layout.id} value={layout.id}>
          {layout.name}
        </option>
      ))}
    </SelectUI>
  );
}
