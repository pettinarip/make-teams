// import React, { useState } from "react";
// import { Loader } from "semantic-ui-react";
// import { Link } from "@reach/router";

interface IProps {
  email: string;
  onError: (error: string) => void;
}

export default function ResendCodeLink(__props: IProps) {
  return null;
  // const [loading, setLoading] = useState(false);

  // async function handleResend() {
  //   setLoading(true);
  //   try {
  //     // await Auth.resendSignUp(email);
  //   } catch (e) {
  //     onError(e.message);
  //   }
  //   setLoading(false);
  // }

  // if (loading) {
  //   return <Loader as="span" active inline size="mini" />;
  // }

  // return (
  //   <Link to="#" onClick={handleResend}>
  //     Resend Code
  //   </Link>
  // );
}
