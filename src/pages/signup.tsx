import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Formik, Field, FieldProps } from "formik";
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
import * as yup from "yup";

import useSignUp from "../dal/user/useSignUp";
import useConfirmSignUp from "../dal/user/useConfrimSignUp";
// import ResendCodeLink from "./ResendCodeLink";

export interface IProps {}

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
  const router = useRouter();
  const [signUp] = useSignUp();
  const [confirmSignUp] = useConfirmSignUp();

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
        const response = await confirmSignUp({ email, code: confirmationCode });
        const errors = response?.confirmSignUp.errors;
        if (!errors) {
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

  // function handleResendCodeLinkError(error: string) {
  //   setSignUpError(error);
  // }

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
        {({ handleSubmit, isSubmitting }) => (
          <Box as="form" onSubmit={handleSubmit}>
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
                <Field name="confirmationCode">
                  {({ field, form }: FieldProps) => (
                    <FormControl
                      my={4}
                      isRequired
                      isInvalid={
                        !!form.errors.confirmationCode &&
                        !!form.touched.confirmationCode
                      }
                    >
                      <FormLabel htmlFor="confirmationCode">
                        Enter your code
                      </FormLabel>
                      <Input {...field} autoFocus id="confirmationCode" />
                      <FormErrorMessage>
                        {form.errors.confirmationCode}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <FormControl my={4}>
                  <FormHelperText>
                    Lost your code?{" "}
                    {/* <ResendCodeLink
                        email={values.email}
                        onError={handleResendCodeLinkError}
                      /> */}
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
          </Box>
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
