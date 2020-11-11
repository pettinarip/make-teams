import {
  Grid,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  RadioGroup,
  Radio,
  Stack,
} from "@chakra-ui/core";
import { Formik, FormikProps, FormikHelpers, Field, FieldProps } from "formik";

import validate from "./validate";

export interface IFormValues {
  firstName: string;
  lastName: string;
  gender?: string;
  number?: number;
  position?: "gl" | "def" | "mid" | "fwd";
}

export interface IProps {
  initialValues: IFormValues;
  onSubmit: (values: IFormValues, helpers: FormikHelpers<IFormValues>) => void;
  bindSubmitForm: (submitForm: Function) => void;
}

const GENDER_OPTIONS = [
  { text: "Male", value: "male" },
  { text: "Female", value: "female" },
  { text: "Other", value: "other" },
];

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
          <form>
            <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={6}>
              <Field name="firstName">
                {({ field, form }: FieldProps) => (
                  <FormControl
                    isRequired
                    isInvalid={
                      !!form.errors.firstName && !!form.touched.firstName
                    }
                  >
                    <FormLabel htmlFor="firstName">First name</FormLabel>
                    <Input {...field} id="firstName" placeholder="First name" />
                    <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="lastName">
                {({ field, form }: FieldProps) => (
                  <FormControl
                    isRequired
                    isInvalid={
                      !!form.errors.lastName && !!form.touched.lastName
                    }
                  >
                    <FormLabel htmlFor="lastName">Last name</FormLabel>
                    <Input {...field} id="lastName" placeholder="Last name" />
                    <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Grid>
            <Field name="gender">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isRequired
                  isInvalid={!!form.errors.gender && !!form.touched.gender}
                  mt={6}
                >
                  <FormLabel htmlFor="gender">Gender</FormLabel>
                  <Select {...field} id="gender" placeholder="Gender">
                    {GENDER_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.text}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>{form.errors.gender}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="number">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isRequired
                  isInvalid={!!form.errors.number && !!form.touched.number}
                  mt={6}
                >
                  <FormLabel htmlFor="number">Number</FormLabel>
                  <NumberInput
                    {...field}
                    id="number"
                    onChange={(value) => {
                      form.setFieldValue("number", parseInt(value));
                    }}
                    min={0}
                    max={99}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <FormErrorMessage>{form.errors.number}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="position">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isRequired
                  isInvalid={!!form.errors.position && !!form.touched.position}
                  mt={6}
                >
                  <FormLabel htmlFor="position">Position</FormLabel>
                  <RadioGroup
                    {...field}
                    id="position"
                    onChange={(value) => {
                      form.setFieldValue("position", value);
                    }}
                  >
                    <Stack>
                      <Radio value="gl">Goalkeeper</Radio>
                      <Radio value="def">Defender</Radio>
                      <Radio value="mid">Mid</Radio>
                      <Radio value="fwd">Forward</Radio>
                    </Stack>
                  </RadioGroup>
                  <FormErrorMessage>{form.errors.position}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </form>
        );
      }}
    </Formik>
  );
}
