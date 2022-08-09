import ChangePasswordForm from "../../components/user/change-password-form";
import { authenGuard } from "../../utils/authen-guard";

export default function ChangePasswordPage() {
  return (
    <ChangePasswordForm />
  );
}

export async function getServerSideProps(context) {
  const result = await authenGuard(context);
  return result;
}
