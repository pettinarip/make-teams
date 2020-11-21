import React from "react";
import { Formik, FormikProps, Field, FieldProps, FormikHelpers } from "formik";
import {
  Box,
  Grid,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Center,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/core";

import { IPosition } from "../../containers/MakeTeam/types";
import fillPositions from "../CreateLayoutButton/fillPositions";
import validate from "./validate";
import FieldEdit from "../FieldEdit";

export const MAX_NUMBER_POSITIONS = 11;

export interface IFormValues {
  name: string;
  positions: Array<IPosition>;
}

export interface IProps {
  initialValues: IFormValues;
  onSubmit: (
    values: IFormValues,
    formikHelpers: FormikHelpers<IFormValues>
  ) => void | Promise<any>;
  bindSubmitForm: (submitForm: Function) => void;
}

export default function CreateLayoutForm(props: IProps) {
  return (
    <Formik
      initialValues={props.initialValues}
      onSubmit={props.onSubmit}
      validate={validate}
      validateOnChange={false}
      validateOnBlur={false}
      // This allow to reinitizlize the form whenever the `size` is changed
      enableReinitialize
    >
      {({ submitForm, setFieldValue, values }: FormikProps<IFormValues>) => {
        props.bindSubmitForm(submitForm);
        return (
          <Box as="form">
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <Field name="name">
                {({ field, form }: FieldProps) => (
                  <FormControl
                    isRequired
                    isInvalid={!!form.errors.name && !!form.touched.name}
                  >
                    <FormLabel htmlFor="new-layout-name">Name</FormLabel>
                    <Input
                      {...field}
                      id="new-layout-name"
                      placeholder="4-4-2"
                    />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <FormControl isRequired>
                <FormLabel htmlFor="new-layout-size">Size</FormLabel>
                <NumberInput
                  // Size is a FE only value, this value is not going to be sent to the BE. It
                  // is just to control the number of positions we need to display
                  id="new-layout-size"
                  value={values.positions.length}
                  onChange={(
                    __valueAsString: string,
                    valueAsNumber: number
                  ) => {
                    setFieldValue(
                      "positions",
                      fillPositions(values.positions, valueAsNumber)
                    );
                  }}
                  min={1}
                  max={MAX_NUMBER_POSITIONS}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Grid>
            <Center mt={6}>
              <Field name="positions">
                {({ field }: FieldProps) => (
                  <FieldEdit
                    positions={field.value}
                    onChange={(positions) => {
                      setFieldValue("positions", positions);
                    }}
                  />
                )}
              </Field>
            </Center>
          </Box>
        );
      }}
    </Formik>
  );
}
