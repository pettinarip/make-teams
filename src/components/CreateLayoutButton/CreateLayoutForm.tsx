import React, { useState } from "react";
import { Formik, FormikProps, FormikHelpers, Field, FieldProps } from "formik";
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
import initialFormation from "./initialFormation";
import validate from "./validate";
import FieldEdit from "../FieldEdit";

const MAX_NUMBER_POSITIONS = 11;

export interface IFormValues {
  name: string;
  positions: Array<IPosition>;
}

export interface IProps {
  onSubmit: (values: IFormValues, helpers: FormikHelpers<IFormValues>) => void;
  bindSubmitForm: (submitForm: Function) => void;
}

export default function CreateLayoutForm(props: IProps) {
  // Size is a FE only value, this value is not going to be sent to the BE. It
  // is just to control the number of positions we need to display
  const [size, setSize] = useState(MAX_NUMBER_POSITIONS);

  const initialState: IFormValues = {
    name: "",
    positions: initialFormation(size),
  };

  function handleSizeChange(__valueAsString: string, valueAsNumber: number) {
    setSize(valueAsNumber);
  }

  return (
    <Formik
      initialValues={initialState}
      onSubmit={props.onSubmit}
      validate={validate}
      validateOnChange={false}
      validateOnBlur={false}
      // This allow to reinitizlize the form whenever the `size` is changed
      enableReinitialize
    >
      {({ submitForm, setFieldValue }: FormikProps<IFormValues>) => {
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
                      autoFocus
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
                  id="new-layout-size"
                  value={size}
                  onChange={handleSizeChange}
                  min={1}
                  max={11}
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
