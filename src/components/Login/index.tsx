import React, { useState } from "react";
import { RouteComponentProps, useNavigate, Link } from "@reach/router";
import { Grid, Form, Segment, Button, Message } from "semantic-ui-react";
import { Formik, Field, FormikHelpers } from "formik";
import * as yup from "yup";

import toErrorMap from "../../utils/toErrorMap";
import useLogin from "../../dal/user/useLogin";

export interface IProps extends RouteComponentProps {}

interface IFormValues {
  email: string;
  password: string;
}

const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(30).required(),
});

export default function Login(__props: IProps) {
  const [login] = useLogin();
  const [signInError, setSignInError] = useState("");
  const navigate = useNavigate();

  const initialValues: IFormValues = { email: "", password: "" };

  async function handleLogin(
    values: IFormValues,
    { setErrors }: FormikHelpers<IFormValues>
  ) {
    setSignInError("");

    try {
      const response = await login(values);
      const errors = response?.login.errors;
      if (errors) {
        setErrors(toErrorMap(errors));
      } else {
        navigate("/", { replace: true });
      }
    } catch (e) {
      setSignInError(e.message);
    }
  }

  return (
    <Grid textAlign="center">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Message attached header="Sign in to your account" />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={handleLogin}
        >
          {({ handleSubmit, isSubmitting, errors }) => (
            <Form size="large" onSubmit={handleSubmit}>
              <Segment attached>
                {!!signInError && <Message negative>{signInError}</Message>}
                <Field
                  name="email"
                  as={Form.Input}
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  disabled={isSubmitting}
                  error={errors.email}
                />
                <Field
                  name="password"
                  type="password"
                  as={Form.Input}
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  disabled={isSubmitting}
                  error={errors.password}
                />
                <Form.Field>
                  Forgot password?{" "}
                  <Link to="/reset-password">Reset password</Link>
                </Form.Field>

                <Button
                  type="submit"
                  primary
                  fluid
                  size="large"
                  loading={isSubmitting}
                >
                  Login
                </Button>
              </Segment>
            </Form>
          )}
        </Formik>
        <Message attached="bottom">
          New to us? <Link to="/sign-up">Sign Up</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
}
