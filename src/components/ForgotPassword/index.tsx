import React, { useState } from "react";
import { RouteComponentProps, Link } from "@reach/router";
import { Grid, Message, Form, Segment, Button } from "semantic-ui-react";
import { Formik, Field } from "formik";
import * as yup from "yup";
import useForgotPassword from "../../dal/user/useForgotPassword";

export interface IProps extends RouteComponentProps {}

interface IFormValues {
  email: string;
}

const validationEmailSchema = yup.object({
  email: yup.string().email().required(),
});

export default function ForgotPassword(__props: IProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [forgotPassword] = useForgotPassword();

  const initialValues: IFormValues = {
    email: "",
  };

  async function handleResetPassword(values: IFormValues) {
    const { email } = values;
    setFormError("");

    try {
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (e) {
      setFormError(e.message);
    }
  }

  return (
    <Grid textAlign="center">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Message attached header="Forgot password" />
        <Formik
          initialValues={initialValues}
          validationSchema={validationEmailSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={handleResetPassword}
        >
          {({ handleSubmit, isSubmitting, errors, values }) => (
            <Form size="large" onSubmit={handleSubmit}>
              <Segment attached>
                {isSubmitted && (
                  <p>
                    Check your email account and follow the instructions. If you
                    did not receive the reset email, try again.
                  </p>
                )}

                {!!formError && <Message negative>{formError}</Message>}

                {!isSubmitted && (
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
                      Reset password
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
