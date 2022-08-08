import { useRouter } from "next/router";
import Link from "next/link";
import { Fragment, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import styles from './login-form.module.css';

function LoginForm() {
  const [error, setError] = useState(null);

  const router = useRouter();
  const { reqUrl } = router.query;

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  async function handleFormSubmission(event) {
    event.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    const loginResult = await signIn('credentials', {
      redirect: false,
      email,
      password
    });

    // Logged in successfully
    if (!loginResult.error) {
      if (reqUrl) {
        router.push(reqUrl);
      }
      else {
        // Redirect to All Posts page
        router.push('/posts');
      }
    }
    else {
      setError("Invalid email or password!");
    }
  }

  return (
    <Fragment>
      <h1>Log in to Your Account</h1>
      <form onSubmit={handleFormSubmission}>
        <div className="row">
          <div className="col-label">
            <label htmlFor="email">Email </label>
          </div>
          <div className="col-input">
            <input type="text" id="email" ref={emailInputRef} />
          </div>
        </div>
        <div className="row">
          <div className="col-label">
            <label htmlFor="password">Password </label>
          </div>
          <div className="col-input">
            <input type="password" id="password" ref={passwordInputRef} />
          </div>
        </div>
        {error && <div className={styles['error-msg']}>{error}</div>}
        <input type="submit" value="Login" />
      </form>
      <p>
        <span>Don&apos;t have an account? </span>
        <Link href="/user/signup">
          <a>Sign Up</a>
        </Link>
      </p>
    </Fragment>
  );
}
export default LoginForm;
