import { Fragment, useRef, useContext } from "react";
import NotificationContext from "../../store/notification-context";

function ChangePasswordForm() {
  const notificationCtx = useContext(NotificationContext);

  const oldPasswordInputRef = useRef();
  const newPasswordInputRef = useRef();

  function handleFormSubmission(event) {
    event.preventDefault();
    notificationCtx.showNotification({
      title: 'In progress...',
      message: 'Your new password is being proceeded...',
      status: 'pending'
    });

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
      .then(data => {
        notificationCtx.showNotification({
          title: 'Finished',
          message: data.message,
          status: data.status
        });
      });
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
