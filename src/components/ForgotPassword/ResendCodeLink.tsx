// import { useState } from "react";
// import { Auth } from "aws-amplify";
// import { Loader } from "semantic-ui-react";
// import { Link } from "@reach/router";

interface IProps {
  email: string;
  onError: (error: string) => void;
}

export default function ResendCodeLink(__props: IProps) {
  // const [loading, setLoading] = useState(false);

  // async function handleResend() {
  //   setLoading(true);
  //   try {
  //     // await Auth.forgotPassword(email);
  //   } catch (e) {
  //     onError(e.message);
  //   }
  //   setLoading(false);
  // }

  return null;

  // if (loading) {
  //   return <Loader as="span" active inline size="mini" />;
  // }

  // return (
  //   <Link to="#" onClick={handleResend}>
  //     Resend Code
  //   </Link>
  // );
}
