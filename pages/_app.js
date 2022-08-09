import { SessionProvider } from "next-auth/react";
import { NotificationContextProvider } from "../store/notification-context";
import Layout from '../components/layout/layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <NotificationContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NotificationContextProvider>
    </SessionProvider>
  )
}
export default MyApp
