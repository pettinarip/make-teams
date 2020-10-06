import { Center, FormControl, FormLabel, Switch } from "@chakra-ui/core";

export interface IProps {
  showNames: boolean;
  onShowNamesChange: () => void;
}

export default function Controls(props: IProps) {
  return (
    <FormControl as={Center}>
      <FormLabel htmlFor="email-alerts">Show names</FormLabel>
      <Switch
        id="show-names"
        isChecked={props.showNames}
        onChange={props.onShowNamesChange}
      />
    </FormControl>
  );
}
