// import React, { useState } from "react";
// import {
//   RouteComponentProps,
//   Link,
//   useNavigate,
//   useParams,
// } from "@reach/router";
// import { Grid, Message, Form, Segment, Button } from "semantic-ui-react";
// import { Formik, Field } from "formik";
// import * as yup from "yup";
// import useChangePassword from "../../dal/user/useChangePassword";

export interface IProps {}

// interface IFormValues {
//   newPassword: string;
// }

// const validationResetSchema = yup.object({
//   newPassword: yup.string().min(8).max(30).required(),
// });

export default function ResetPassword(__props: IProps) {
  return null;
  // const { token } = useParams();
  // const [formError, setFormError] = useState("");
  // const [changePassword] = useChangePassword();
  // const navigate = useNavigate();

  // const initialValues: IFormValues = {
  //   newPassword: "",
  // };

  // async function handleResetPassword(values: IFormValues) {
  //   const { newPassword } = values;
  //   setFormError("");

  //   try {
  //     await changePassword({ token, newPassword });
  //     navigate("/login", { replace: true });
  //   } catch (e) {
  //     setFormError(e.message);
  //   }
  // }

  // return (
  //   <Grid textAlign="center">
  //     <Grid.Column style={{ maxWidth: 450 }}>
  //       <Message attached header="Reset your password" />
  //       <Formik
  //         initialValues={initialValues}
  //         validationSchema={validationResetSchema}
  //         validateOnChange={false}
  //         validateOnBlur={false}
  //         onSubmit={handleResetPassword}
  //       >
  //         {({ handleSubmit, isSubmitting, errors }) => (
  //           <Form size="large" onSubmit={handleSubmit}>
  //             <Segment attached>
  //               {!!formError && <Message negative>{formError}</Message>}

  //               <Field
  //                 name="newPassword"
  //                 type="password"
  //                 as={Form.Input}
  //                 fluid
  //                 icon="lock"
  //                 iconPosition="left"
  //                 placeholder="New Password"
  //                 disabled={isSubmitting}
  //                 error={errors.newPassword}
  //               />

  //               <Button
  //                 type="submit"
  //                 primary
  //                 fluid
  //                 size="large"
  //                 loading={isSubmitting}
  //               >
  //                 Submit
  //               </Button>
  //             </Segment>
  //           </Form>
  //         )}
  //       </Formik>
  //       <Message attached="bottom">
  //         Back to <Link to="/login">Sign In</Link>
  //       </Message>
  //     </Grid.Column>
  //   </Grid>
  // );
}
