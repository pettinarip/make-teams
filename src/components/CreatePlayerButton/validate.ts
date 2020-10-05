import { FormikErrors } from "formik";

import { IFormValues } from "./CreatePlayerForm";

export default function validate(values: IFormValues) {
  const errors: FormikErrors<IFormValues> = {};
  console.log(values);

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
