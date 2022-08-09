import { Fragment, useRef } from "react";

function ChangePasswordForm() {
  const oldPasswordInputRef = useRef();
  const newPasswordInputRef = useRef();

  function handleFormSubmission(event) {
    event.preventDefault();

    const reqBody = {
      oldPassword: oldPasswordInputRef.current.value,
      newPassword: newPasswordInputRef.current.value
    };

    fetch('/api/user/change-password', {
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
      <h1>Change Password</h1>
      <form onSubmit={handleFormSubmission}>
        <div className="row">
          <div className="col-label">
            <label htmlFor="old-password">Old Password </label>
          </div>
          <div className="col-input">
            <input type="password" id="old-password" ref={oldPasswordInputRef} />
          </div>
        </div>
        <div className="row">
          <div className="col-label">
            <label htmlFor="new-password">New Password </label>
          </div>
          <div className="col-input">
            <input type="password" id="new-password" ref={newPasswordInputRef} />
          </div>
        </div>
        <input type="submit" value="Submit" />
      </form>
    </Fragment>
  );
}
export default ChangePasswordForm;
