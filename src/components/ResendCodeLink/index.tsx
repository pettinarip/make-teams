import { useState } from "react";
import { Link, Spinner } from "@chakra-ui/core";

import useResendConfirmationCode from "../../dal/user/useResendConfirmationCode";

interface IProps {
  email: string;
  onError: (error: string) => void;
}

export default function ResendCodeLink({ email, onError }: IProps) {
  const [loading, setLoading] = useState(false);
  const [resendConfirmationCode] = useResendConfirmationCode();

  async function handleResend() {
    setLoading(true);
    try {
      await resendConfirmationCode({ email });
    } catch (e) {
      onError(e.message);
    }
    setLoading(false);
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <Link color="blue.500" onClick={handleResend}>
      Resend Code
    </Link>
  );
}
