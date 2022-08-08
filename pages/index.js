import { Fragment } from "react";

export default function Home(props) {
  return (
    <Fragment>
      <h1>Home Page</h1>
      <div>{props.message}</div>
    </Fragment>
  )
}

export async function getServerSideProps() {
  console.log('getServerSideProps called')
  return {
    props: {
      message: 'This is a test message'
    }
  }
}
