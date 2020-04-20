import React, { useState } from "react";
import { RouteComponentProps, useNavigate } from "@reach/router";
import { Grid, Form, Segment, Button, Message } from "semantic-ui-react";
import { Formik, Field } from "formik";
import { Auth } from "aws-amplify";
import * as yup from "yup";

export interface IProps extends RouteComponentProps {}

interface IFormValues {
  email: string;
  password: string;
  confirmationCode: string;
}

const validationSignUpSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(30).required(),
});

const validationConfirmationSchema = yup.object({
  email: yup.string().email().required(),
  confirmationCode: yup.string().required(),
});

export default function SignUp(__props: IProps) {
  const [isVerifyStep, setIsVerifyStep] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const navigate = useNavigate();

  const initialValues: IFormValues = {
    email: "",
    password: "",
    confirmationCode: "",
  };

  async function handleSignUp(values: IFormValues) {
    const { email, password, confirmationCode } = values;
    setSignUpError("");

    try {
      if (isVerifyStep) {
        await Auth.confirmSignUp(email, confirmationCode);
        navigate("/login", { replace: true });
      } else {
        await Auth.signUp({ username: email, password });
        setIsVerifyStep(true);
      }
    } catch (e) {
      setSignUpError(e.message);
    }
  }

  function validationSchema() {
    if (isVerifyStep) {
      return validationConfirmationSchema;
    } else {
      return validationSignUpSchema;
    }
  }

  return (
    <Grid textAlign="center">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Message attached header="Create a new account" />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={handleSignUp}
        >
          {({ handleSubmit, isSubmitting, errors }) => (
            <Form size="large" onSubmit={handleSubmit}>
              <Segment attached>
                {!!signUpError && <Message negative>{signUpError}</Message>}
                <Field
                  autoFocus
                  name="email"
                  as={Form.Input}
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  disabled={isVerifyStep || isSubmitting}
                  error={errors.email}
                />

                {!isVerifyStep && (
                  <div>
                    <Field
                      name="password"
                      type="password"
                      as={Form.Input}
                      fluid
                      icon="lock"
                      iconPosition="left"
                      placeholder="Password"
                      disabled={isVerifyStep || isSubmitting}
                      error={errors.password}
                    />
                    <Button
                      type="submit"
                      primary
                      fluid
                      size="large"
                      loading={isSubmitting}
                    >
                      Sign Up
                    </Button>
                  </div>
                )}

                {isVerifyStep && (
                  <div>
                    <Field
                      autoFocus
                      name="confirmationCode"
                      as={Form.Input}
                      fluid
                      icon="ellipsis horizontal"
                      iconPosition="left"
                      placeholder="Enter your code"
                      error={errors.confirmationCode}
                    />
                    <Button
                      type="submit"
                      primary
                      fluid
                      size="large"
                      loading={isSubmitting}
                    >
                      Verify
                    </Button>
                  </div>
                )}
              </Segment>
            </Form>
          )}
        </Formik>
        <Message attached="bottom">
          Have an account? <a href="/login">Sign In</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
}
