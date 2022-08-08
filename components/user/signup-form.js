import { Fragment, useRef } from "react";

function SignupForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  function handleFormSubmission(event) {
    event.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const reqBody = { email, password };

    fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => console.log(data));
  }

  return (
    <Fragment>
      <h1>Create New Account</h1>
      <form onSubmit={handleFormSubmission}>
        <div className="row">
          <div className="col-label">
            <label htmlFor="email">Email </label>
          </div>
          <div className="col-input">
            <input type="email" id="email" ref={emailInputRef} />
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
        <input type="submit" value="Sign Up" />
      </form>
    </Fragment>
  );
}
export default SignupForm;
