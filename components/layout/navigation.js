import { signOut } from "next-auth/react";
import Link from "next/link";
import styles from './navigation.module.css';

export default function Navigation() {
  function logoutHandler() {
    signOut();
  }

  return (
    <header className={styles.header}>
      <Link href="/">
        <a className={styles['nav-link']}>HOME</a>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/posts">
              <a className={styles['nav-link']}>Posts</a>
            </Link>
          </li>
          <li>
            <Link href="/posts/create" >
              <a className={styles['nav-link']}>Create Post</a>
            </Link>
          </li>
          <li>
            <span className={styles['nav-link']}
              onClick={logoutHandler}>Log Out</span>
          </li>
          <li>
            <Link href="/user/login">
              <a className={styles['nav-link']}>Sign In</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
