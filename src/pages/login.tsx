import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import * as yup from "yup";
import { Formik, Field, FormikHelpers, FieldProps } from "formik";
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
  Link as LinkUI,
} from "@chakra-ui/core";

import toErrorMap from "../utils/toErrorMap";
import useLogin from "../dal/user/useLogin";

export interface IProps {}

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
  const router = useRouter();

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
        router.replace("/");
      }
    } catch (e) {
      setSignInError(e.message);
    }
  }

  return (
    <Box marginX="auto" width="100%" maxWidth="24rem">
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
        {({ handleSubmit, isSubmitting }) => (
          <Box as="form" onSubmit={handleSubmit}>
            {!!signInError && (
              <Alert status="error">
                <AlertIcon />
                <AlertDescription>{signInError}</AlertDescription>
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
                <Link href="/forgot-password">
                  <LinkUI color="blue.500">Reset password</LinkUI>
                </Link>
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
          </Box>
        )}
      </Formik>
      <FormControl textAlign="center" my={4}>
        <FormHelperText>
          New to us?{" "}
          <Link href="/signup">
            <LinkUI color="blue.500">Sign Up</LinkUI>
          </Link>
        </FormHelperText>
      </FormControl>
    </Box>
  );
}
