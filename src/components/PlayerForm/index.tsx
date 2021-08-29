import { Grid, Radio } from "@chakra-ui/react";
import { Formik, FormikProps, FormikHelpers, Form } from "formik";
import {
  InputControl,
  NumberInputControl,
  RadioGroupControl,
  SelectControl,
} from "formik-chakra-ui";

import validate from "./validate";

export enum EGender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export interface IFormValues {
  firstName: string;
  lastName: string;
  gender: EGender;
  number?: number;
  position: "gl" | "def" | "mid" | "fwd";
}

export interface IProps {
  initialValues: IFormValues;
  onSubmit: (values: IFormValues, helpers: FormikHelpers<IFormValues>) => void;
  bindSubmitForm: (submitForm: Function) => void;
}

const GENDER_OPTIONS: { [gender: string]: string } = {
  [EGender.MALE]: "Male",
  [EGender.FEMALE]: "Female",
  [EGender.OTHER]: "Other",
};

export default function PlayerForm(props: IProps) {
  return (
    <Formik
      initialValues={props.initialValues}
      onSubmit={props.onSubmit}
      validate={validate}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ submitForm }: FormikProps<IFormValues>) => {
        props.bindSubmitForm(submitForm);
        return (
          <Form>
            <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={6}>
              <InputControl name="firstName" label="First name" isRequired />
              <InputControl name="lastName" label="Last name" isRequired />
            </Grid>
            <SelectControl
              isRequired
              label="Gender"
              name="gender"
              selectProps={{ placeholder: "Select option" }}
              mt={6}
            >
              {Object.keys(GENDER_OPTIONS).map((key) => (
                <option key={key} value={key}>
                  {GENDER_OPTIONS[key]}
                </option>
              ))}
            </SelectControl>
            <NumberInputControl
              isRequired
              name="number"
              label="Number"
              numberInputProps={{ min: 0, max: 99 }}
              mt={6}
            />
            <RadioGroupControl
              isRequired
              name="position"
              label="Position"
              stackProps={{ direction: "column" }}
              mt={6}
            >
              <Radio id="position-gl" value="gl">
                Goalkeeper
              </Radio>
              <Radio id="position-def" value="def">
                Defender
              </Radio>
              <Radio id="position-mid" value="mid">
                Mid
              </Radio>
              <Radio id="position-fwd" value="fwd">
                Forward
              </Radio>
            </RadioGroupControl>
          </Form>
        );
      }}
    </Formik>
  );
}
