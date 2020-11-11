import { FormikErrors } from "formik";

import { IFormValues } from ".";

export default function validate(values: IFormValues) {
  const errors: FormikErrors<IFormValues> = {};

  if (!values.firstName) {
    errors.firstName = "Required";
  }

  if (!values.lastName) {
    errors.lastName = "Required";
  }

  if (!values.number) {
    errors.number = "Required";
  }

  return errors;
}
