import React, { useState } from "react";
import { Grid, Form } from "semantic-ui-react";
import { Formik, FormikProps, FormikHelpers, Field, FieldProps } from "formik";

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

  function handleSizeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSize(+e.target.value);
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
      {({
        values,
        errors,
        handleChange,
        submitForm,
        setFieldValue,
      }: FormikProps<IFormValues>) => {
        props.bindSubmitForm(submitForm);
        return (
          <Form>
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Form.Input
                    id="new-layout-name"
                    fluid
                    autoFocus
                    name="name"
                    label={{
                      children: "Name",
                      htmlFor: "new-layout-name",
                    }}
                    placeholder="4-4-2"
                    value={values.name}
                    onChange={handleChange}
                    required
                    error={errors.name}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Form.Input
                    id="new-layout-size"
                    min={1}
                    max={MAX_NUMBER_POSITIONS}
                    name="size"
                    label={{
                      children: "Size",
                      htmlFor: "new-layout-size",
                    }}
                    onChange={handleSizeChange}
                    type="number"
                    value={size}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
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
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
}
