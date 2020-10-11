import {
  Center,
  ChakraProps,
  FormControl,
  FormLabel,
  Switch,
} from "@chakra-ui/core";

export interface IProps extends ChakraProps {
  showNames: boolean;
  onShowNamesChange: () => void;
}

export default function Controls({
  showNames,
  onShowNamesChange,
  ...restProps
}: IProps) {
  return (
    <FormControl as={Center} {...restProps}>
      <FormLabel htmlFor="show-names">Show names</FormLabel>
      <Switch
        id="show-names"
        isChecked={showNames}
        onChange={onShowNamesChange}
      />
    </FormControl>
  );
}
