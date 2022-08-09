import Head from 'next/head';
import { Fragment } from 'react';
import { SessionProvider } from "next-auth/react";
import { NotificationContextProvider } from "../store/notification-context";
import Layout from '../components/layout/layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Fragment>
      <Head>
        <title>My Cool Blog</title>
        <meta name='description' content='My cool blog' />
      </Head>
      <SessionProvider session={session}>
        <NotificationContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </NotificationContextProvider>
      </SessionProvider>
    </Fragment>
  )
}
export default MyApp
