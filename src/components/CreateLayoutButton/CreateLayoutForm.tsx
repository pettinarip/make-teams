import React from "react";
import { Form } from "semantic-ui-react";
import { Formik, FormikProps, FormikHelpers, Field, FieldProps } from "formik";

import { IPosition } from "../../containers/MakeTeam/types";
import initialFormation from "./initialFormation";
import validate from "./validate";
import FieldEdit from "../FieldEdit";

export interface IFormValues {
  name: string;
  positions: Array<IPosition>;
}

export interface IProps {
  onSubmit: (values: IFormValues, helpers: FormikHelpers<IFormValues>) => void;
  bindSubmitForm: (submitForm: Function) => void;
}

export default function CreateLayoutForm(props: IProps) {
  const initialState: IFormValues = {
    name: "",
    positions: initialFormation(),
  };

  return (
    <Formik
      initialValues={initialState}
      onSubmit={props.onSubmit}
      validate={validate}
      validateOnChange={false}
      validateOnBlur={false}
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
            <Form.Input
              fluid
              autoFocus
              name="name"
              label="Name"
              placeholder="4-4-2"
              value={values.name}
              onChange={handleChange}
              required
              error={!!errors.name}
            />
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
          </Form>
        );
      }}
    </Formik>
  );
}
