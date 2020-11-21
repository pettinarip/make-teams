import { FormikErrors } from "formik";

import { IFormValues } from ".";

export default function validate(values: IFormValues) {
  const errors: FormikErrors<IFormValues> = {};

  if (!values.name) {
    errors.name = "Required";
  }

  return errors;
}
