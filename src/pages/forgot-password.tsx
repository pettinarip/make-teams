import { useState } from "react";
import { Formik, Field, FieldProps } from "formik";
import * as yup from "yup";
import NextLink from "next/link";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Link,
} from "@chakra-ui/core";

import useForgotPassword from "../dal/user/useForgotPassword";

export interface IProps {}

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
      const response = await forgotPassword({ email });
      if (response?.forgotPassword) {
        setIsSubmitted(true);
      } else {
        setFormError(
          "There was an error while sending the reset link to your email. Try again."
        );
      }
    } catch (e) {
      setFormError(e.message);
    }
  }

  return (
    <Box marginX="auto" width="100%" maxWidth="30rem">
      <Heading as="h2" my={6} size="md" textAlign="center">
        Forgot password
      </Heading>
      <Formik
        initialValues={initialValues}
        validationSchema={validationEmailSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={handleResetPassword}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Box as="form" onSubmit={handleSubmit}>
            {!!formError && (
              <Alert status="error" mb={4}>
                <AlertIcon />
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            )}

            {isSubmitted && (
              <>
                <Alert status="info">
                  <AlertIcon />
                  Check your email account and follow the instructions.
                </Alert>
                <Button
                  type="submit"
                  colorScheme="blue"
                  onClick={() => handleSubmit()}
                  isLoading={isSubmitting}
                  width="100%"
                  my={4}
                >
                  Resend code
                </Button>
              </>
            )}

            {!isSubmitted && (
              <>
                <Field name="email">
                  {({ field, form }: FieldProps) => (
                    <FormControl
                      isRequired
                      isInvalid={!!form.errors.email && !!form.touched.email}
                    >
                      <FormLabel htmlFor="email">E-mail</FormLabel>
                      <Input
                        {...field}
                        autoFocus
                        id="email"
                        disabled={isSubmitting}
                      />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  type="submit"
                  colorScheme="blue"
                  isLoading={isSubmitting}
                  width="100%"
                  mt={4}
                >
                  Reset password
                </Button>
              </>
            )}
          </Box>
        )}
      </Formik>
      <FormControl textAlign="center" my={4}>
        <FormHelperText>
          Back to{" "}
          <NextLink href="/login">
            <Link color="blue.500">Sign In</Link>
          </NextLink>
        </FormHelperText>
      </FormControl>
    </Box>
  );
}
