import React from "react";
import { Form } from "semantic-ui-react";
import { Formik, FormikProps, FormikHelpers } from "formik";

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

const options = [
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
    <Formik initialValues={initialState} onSubmit={props.onSubmit}>
      {({ values, handleChange, submitForm }: FormikProps<IFormValues>) => {
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
              />
              <Form.Input
                fluid
                name="lastName"
                label="Last name"
                placeholder="Last name"
                value={values.lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Select
              fluid
              name="gender"
              label="Gender"
              placeholder="Gender"
              options={options}
              value={values.gender}
              onChange={handleChange}
            />
            <Form.Input
              name="number"
              type="number"
              label="Number"
              value={values.number}
              onChange={handleChange}
              max={99}
              required
            />
            <Form.Group
              inline
              name="position"
              value={values.position}
              onChange={handleChange}
            >
              <label>Position</label>
              <Form.Radio label="Goalkeeper" value="gl" />
              <Form.Radio label="Defender" value="def" />
              <Form.Radio label="Mid" value="mid" />
              <Form.Radio label="Forward" value="fwd" />
            </Form.Group>
          </Form>
        );
      }}
    </Formik>
  );
}
