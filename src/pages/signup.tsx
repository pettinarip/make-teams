import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Formik, Field, FieldProps, FormikHelpers, Form } from "formik";
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
} from "@chakra-ui/react";
import * as yup from "yup";

import useSignUp from "../dal/user/useSignUp";
import useConfirmSignUp from "../dal/user/useConfrimSignUp";
import ResendCodeLink from "../components/ResendCodeLink";
import toErrorMap from "../utils/toErrorMap";

export interface IProps {}

interface IFormValues {
  email: string;
  password: string;
  code: string;
}

const validationSignUpSchema = yup.object({
  email: yup
    .string()
    .label("Email")
    .email("Enter a valid email with the following format: your@email.com")
    .required(),
  password: yup.string().label("Password").min(8).max(30).required(),
});

const validationConfirmationSchema = yup.object({
  email: yup.string().email().required(),
  code: yup.string().required(),
});

export default function SignUp(__props: IProps) {
  const [isVerifyStep, setIsVerifyStep] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const router = useRouter();
  const { mutateAsync: signUp } = useSignUp();
  const { mutateAsync: confirmSignUp } = useConfirmSignUp();

  const initialValues: IFormValues = {
    email: "",
    password: "",
    code: "",
  };

  async function handleSignUp(
    values: IFormValues,
    { setErrors }: FormikHelpers<IFormValues>
  ) {
    const { email, password, code } = values;
    setSignUpError("");

    try {
      if (isVerifyStep) {
        const response = await confirmSignUp({ email, code });
        const errors = response?.confirmSignUp.errors;
        if (errors) {
          setErrors(toErrorMap(errors));
        } else {
          router.replace("/");
        }
      } else {
        await signUp({ email, password });
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

  function handleResendCodeLinkError(error: string) {
    setSignUpError(error);
  }

  return (
    <Box marginX="auto" width="100%" maxWidth="30rem">
      <Heading as="h2" my={6} size="md" textAlign="center">
        Create a new account
      </Heading>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={handleSignUp}
      >
        {({ isSubmitting, values }) => (
          <Form noValidate>
            {!!signUpError && (
              <Alert status="error">
                <AlertIcon />
                <AlertDescription>{signUpError}</AlertDescription>
              </Alert>
            )}
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
                    disabled={isVerifyStep || isSubmitting}
                  />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            {!isVerifyStep && (
              <div>
                <Field name="password">
                  {({ field, form }: FieldProps) => (
                    <FormControl
                      my={4}
                      isRequired
                      isInvalid={
                        !!form.errors.password && !!form.touched.password
                      }
                    >
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Input
                        {...field}
                        id="password"
                        type="password"
                        disabled={isVerifyStep || isSubmitting}
                      />
                      <FormErrorMessage>
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  type="submit"
                  colorScheme="blue"
                  isLoading={isSubmitting}
                  width="100%"
                >
                  Sign Up
                </Button>
              </div>
            )}

            {isVerifyStep && (
              <div>
                <Field name="code">
                  {({ field, form }: FieldProps) => (
                    <FormControl
                      my={4}
                      isRequired
                      isInvalid={!!form.errors.code && !!form.touched.code}
                    >
                      <FormLabel htmlFor="code">Enter your code</FormLabel>
                      <Input {...field} autoFocus id="code" />
                      <FormErrorMessage>{form.errors.code}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <FormControl my={4}>
                  <FormHelperText>
                    Lost your code?{" "}
                    <ResendCodeLink
                      email={values.email}
                      onError={handleResendCodeLinkError}
                    />
                  </FormHelperText>
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  isLoading={isSubmitting}
                  width="100%"
                >
                  Verify
                </Button>
              </div>
            )}
          </Form>
        )}
      </Formik>
      <FormControl textAlign="center" my={4}>
        <FormHelperText>
          Have an account?{" "}
          <Link href="/login">
            <LinkUI color="blue.500">Sign In</LinkUI>
          </Link>
        </FormHelperText>
      </FormControl>
    </Box>
  );
}
