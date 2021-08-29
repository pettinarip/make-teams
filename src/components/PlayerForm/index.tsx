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
  Radio,
} from "@chakra-ui/react";
import {
  Formik,
  FormikProps,
  FormikHelpers,
  Field,
  FieldProps,
  Form,
} from "formik";
import { RadioGroupControl } from "formik-chakra-ui";

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
                    {Object.keys(GENDER_OPTIONS).map((key) => (
                      <option key={key} value={key}>
                        {GENDER_OPTIONS[key]}
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
            <RadioGroupControl
              name="position"
              label="Position"
              isRequired
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
