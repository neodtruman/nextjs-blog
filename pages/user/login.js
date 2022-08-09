import Head from "next/head";
import { Fragment } from "react";
import LoginForm from "../../components/user/login-form";

export default function LoginPage() {
  return (
    <Fragment>
      <Head>
        <title>Login Page</title>
      </Head>
      <LoginForm />
    </Fragment>
  );
}
