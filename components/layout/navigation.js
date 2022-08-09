import { useSession, signOut } from "next-auth/react";
import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import styles from './navigation.module.css';

export default function Navigation() {
  const [user, setUser] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      // Get user role here
      fetch('/api/user/profile')
        .then(response => response.json())
        .then(data => {
          setUser(data.user);
        });
    }
  }, [session]);

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

          {user && user.role === 'admin' && <li>
            <Link href="/posts/create" >
              <a className={styles['nav-link']}>Create Post</a>
            </Link>
          </li>}
          {user && <Fragment>
            <li>
              <Link href="/user/change-password" >
                <a className={styles['nav-link']}>Change Password</a>
              </Link>
            </li>
            <li>
              <span className={styles['nav-link']}
                onClick={logoutHandler}>Log Out</span>
            </li>
          </Fragment>}

          {!user && <li>
            <Link href="/user/login">
              <a className={styles['nav-link']}>Sign In</a>
            </Link>
          </li>}
        </ul>
      </nav>
    </header>
  )
}
