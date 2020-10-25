import { useState } from "react";
import { Formik, Field, FieldProps } from "formik";
import { useRouter } from "next/router";
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
import * as yup from "yup";

import useChangePassword from "../../dal/user/useChangePassword";

export interface IProps {}

interface IFormValues {
  newPassword: string;
}

const validationResetSchema = yup.object({
  newPassword: yup.string().label("Password").min(8).max(30).required(),
});

export default function ResetPassword(__props: IProps) {
  const [formError, setFormError] = useState("");
  const [changePassword] = useChangePassword();
  const router = useRouter();

  const { token } = router.query;

  const initialValues: IFormValues = {
    newPassword: "",
  };

  async function handleResetPassword(values: IFormValues) {
    const { newPassword } = values;
    setFormError("");

    try {
      const response = await changePassword({
        token: token as string,
        newPassword,
      });
      const errors = response?.changePassword.errors;
      if (errors) {
        setFormError(errors[0].message);
      } else {
        router.replace("/login");
      }
    } catch (e) {
      setFormError(e.message);
    }
  }

  return (
    <Box marginX="auto" width="100%" maxWidth="30rem">
      <Heading as="h2" my={6} size="md" textAlign="center">
        Reset your password
      </Heading>
      <Formik
        initialValues={initialValues}
        validationSchema={validationResetSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={handleResetPassword}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Box as="form" onSubmit={handleSubmit}>
            {!!formError && (
              <Alert status="error">
                <AlertIcon />
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            )}
            <Field name="newPassword">
              {({ field, form }: FieldProps) => (
                <FormControl
                  my={4}
                  isRequired
                  isInvalid={
                    !!form.errors.newPassword && !!form.touched.newPassword
                  }
                >
                  <FormLabel htmlFor="newPassword">New Password</FormLabel>
                  <Input
                    {...field}
                    id="newPassword"
                    type="password"
                    autoFocus
                    disabled={isSubmitting}
                  />
                  <FormErrorMessage>{form.errors.newPassword}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Button
              type="submit"
              colorScheme="blue"
              isLoading={isSubmitting}
              width="100%"
            >
              Submit
            </Button>
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
