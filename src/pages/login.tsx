import { useState } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import * as yup from "yup";
import { Formik, Field, FormikHelpers, FieldProps, Form } from "formik";
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
} from "@chakra-ui/react";

import toErrorMap from "../utils/toErrorMap";
import useLogin from "../dal/user/useLogin";

export interface IProps {}

interface IFormValues {
  email: string;
  password: string;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .label("Email")
    .email("Enter a valid email with the following format: your@email.com")
    .required(),
  password: yup.string().label("Password").min(8).max(30).required(),
});

export default function Login(__props: IProps) {
  const { mutateAsync: login } = useLogin();
  const [error, setError] = useState("");
  const router = useRouter();

  const initialValues: IFormValues = { email: "", password: "" };

  async function handleLogin(
    values: IFormValues,
    { setErrors }: FormikHelpers<IFormValues>
  ) {
    setError("");

    try {
      const response = await login(values);
      const errors = response?.login.errors;
      if (errors) {
        const error = errors[0];
        if (error.field) {
          setErrors(toErrorMap(errors));
        } else {
          setError(error.message);
        }
      } else {
        await router.replace("/");
      }
    } catch (e) {
      // Some unexpected error ocurred. Show a generic message.
      setError("There was an internal error. Try again later.");
    }
  }

  return (
    <Box marginX="auto" width="100%" maxWidth="30rem">
      <Heading as="h2" my={6} size="md" textAlign="center">
        Sign in to your account
      </Heading>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <Form noValidate>
            {!!error && (
              <Alert status="error" mb={4}>
                <AlertIcon />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Field name="email">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isRequired
                  isInvalid={!!form.errors.email && !!form.touched.email}
                >
                  <FormLabel htmlFor="email">E-mail</FormLabel>
                  <Input {...field} autoFocus id="email" />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field, form }: FieldProps) => (
                <FormControl
                  my={4}
                  isRequired
                  isInvalid={!!form.errors.password && !!form.touched.password}
                >
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input {...field} id="password" type="password" />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <FormControl my={4}>
              <FormHelperText>
                Forgot password?{" "}
                <NextLink href="/forgot-password">
                  <Link color="blue.500">Reset password</Link>
                </NextLink>
              </FormHelperText>
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              isLoading={isSubmitting}
              width="100%"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
      <FormControl textAlign="center" my={4}>
        <FormHelperText>
          New to us?{" "}
          <NextLink href="/signup">
            <Link color="blue.500">Sign Up</Link>
          </NextLink>
        </FormHelperText>
      </FormControl>
    </Box>
  );
}
