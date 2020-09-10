import React, { useState } from "react";
import { RouteComponentProps, Link, useNavigate } from "@reach/router";
import { Grid, Message, Form, Segment, Button } from "semantic-ui-react";
import { Formik, Field } from "formik";
import * as yup from "yup";
// import { Auth } from "aws-amplify";

import ResendCodeLink from "./ResendCodeLink";

export interface IProps extends RouteComponentProps {}

interface IFormValues {
  email: string;
  confirmationCode: string;
  newPassword: string;
}

const validationEmailSchema = yup.object({
  email: yup.string().email().required(),
});

const validationResetSchema = yup.object({
  confirmationCode: yup.string().required(),
  newPassword: yup.string().min(8).max(30).required(),
});

export default function ResetPassword(__props: IProps) {
  const [isCodeValidationStep, setIsCodeValidationStep] = useState(false);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const initialValues: IFormValues = {
    email: "",
    confirmationCode: "",
    newPassword: "",
  };

  async function handleResetPassword(values: IFormValues) {
    const { email, confirmationCode, newPassword } = values;
    setFormError("");

    try {
      if (isCodeValidationStep) {
        // await Auth.forgotPasswordSubmit(email, confirmationCode, newPassword);
        navigate("/login", { replace: true });
      } else {
        // await Auth.forgotPassword(email);
        setIsCodeValidationStep(true);
      }
    } catch (e) {
      setFormError(e.message);
    }
  }

  function validationSchema() {
    if (isCodeValidationStep) {
      return validationResetSchema;
    } else {
      return validationEmailSchema;
    }
  }

  function handleResendCodeLinkError(error: string) {
    setFormError(error);
  }

  return (
    <Grid textAlign="center">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Message attached header="Reset your password" />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={handleResetPassword}
        >
          {({ handleSubmit, isSubmitting, errors, values }) => (
            <Form size="large" onSubmit={handleSubmit}>
              <Segment attached>
                {isCodeValidationStep && (
                  <p>
                    Check your email account and enter the code in the following
                    box. If you did not receive the code, try again.{" "}
                    <ResendCodeLink
                      email={values.email}
                      onError={handleResendCodeLinkError}
                    />
                  </p>
                )}

                {!!formError && <Message negative>{formError}</Message>}

                {!isCodeValidationStep && (
                  <div>
                    <Field
                      autoFocus
                      name="email"
                      as={Form.Input}
                      fluid
                      icon="user"
                      iconPosition="left"
                      placeholder="E-mail address"
                      disabled={isSubmitting}
                      error={errors.email}
                    />

                    <Button
                      type="submit"
                      primary
                      fluid
                      size="large"
                      loading={isSubmitting}
                    >
                      Send Code
                    </Button>
                  </div>
                )}

                {isCodeValidationStep && (
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
                    <Field
                      name="newPassword"
                      type="password"
                      as={Form.Input}
                      fluid
                      icon="lock"
                      iconPosition="left"
                      placeholder="New Password"
                      disabled={isSubmitting}
                      error={errors.newPassword}
                    />

                    <Button
                      type="submit"
                      primary
                      fluid
                      size="large"
                      loading={isSubmitting}
                    >
                      Submit
                    </Button>
                  </div>
                )}
              </Segment>
            </Form>
          )}
        </Formik>
        <Message attached="bottom">
          Back to <Link to="/login">Sign In</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
}
