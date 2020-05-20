import React from "react";
import { Form } from "semantic-ui-react";
import { Formik, FormikProps, FormikHelpers } from "formik";

import validate from "./validate";

export interface IFormValues {
  firstName: string;
  lastName: string;
  gender?: string;
  number?: number;
  position?: "gl" | "def" | "mid" | "fwd";
}

export interface IProps {
  onSubmit: (values: IFormValues, helpers: FormikHelpers<IFormValues>) => void;
  bindSubmitForm: (submitForm: Function) => void;
}

const GENDER_OPTIONS = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" },
  { key: "o", text: "Other", value: "other" },
];

export default function CreatePlayerForm(props: IProps) {
  const initialState: IFormValues = {
    firstName: "",
    lastName: "",
    gender: undefined,
    number: undefined,
    position: undefined,
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
            <Form.Group widths="equal">
              <Form.Input
                fluid
                autoFocus
                name="firstName"
                label="First name"
                placeholder="First name"
                value={values.firstName}
                onChange={handleChange}
                required
                error={!!errors.firstName}
              />
              <Form.Input
                fluid
                name="lastName"
                label="Last name"
                placeholder="Last name"
                value={values.lastName}
                onChange={handleChange}
                required
                error={!!errors.lastName}
              />
            </Form.Group>
            <Form.Select
              fluid
              name="gender"
              label="Gender"
              placeholder="Gender"
              options={GENDER_OPTIONS}
              value={values.gender}
              onChange={(e, { name, value }) => setFieldValue(name, value)}
            />
            <Form.Input
              name="number"
              type="number"
              label="Number"
              value={values.number}
              onChange={handleChange}
              max={99}
              required
              error={!!errors.number}
            />
            <Form.Group inline>
              <label>Position</label>
              <Form.Radio
                id="position-gl"
                name="position"
                label="Goalkeeper"
                value="gl"
                checked={values.position === "gl"}
                onChange={handleChange}
              />
              <Form.Radio
                id="position-def"
                name="position"
                label="Defender"
                value="def"
                checked={values.position === "def"}
                onChange={handleChange}
              />
              <Form.Radio
                id="position-mid"
                name="position"
                label="Mid"
                value="mid"
                checked={values.position === "mid"}
                onChange={handleChange}
              />
              <Form.Radio
                id="position-fwd"
                name="position"
                label="Forward"
                value="fwd"
                checked={values.position === "fwd"}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        );
      }}
    </Formik>
  );
}
