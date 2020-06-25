import { FormikErrors } from "formik";

import { IFormValues } from "./CreateLayoutForm";

export default function validate(values: IFormValues) {
  const errors: FormikErrors<IFormValues> = {};

  if (!values.name) {
    errors.name = "Required";
  }

  return errors;
}
