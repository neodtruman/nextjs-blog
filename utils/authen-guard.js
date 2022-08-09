import { getSession } from 'next-auth/react';
import path from 'path';
import fs from 'fs';

export async function authenGuard(context) {
  const session = await getSession({ req: context.req });
  const loginUrl = `/user/login?reqUrl=${context.resolvedUrl}`;

  if (!session) {
    return {
      redirect: {
        destination: loginUrl,
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export async function adminGuard(context) {
  const session = await getSession({ req: context.req });
  const loginUrl = `/user/login?reqUrl=${context.resolvedUrl}`;

  if (!session) {
    return {
      redirect: {
        destination: loginUrl,
        permanent: false
      }
    }
  }

  // get all users
  const filePath = path.join(process.cwd(), 'data', 'users.json');
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  // Check if user existed
  const user = data.find(u => u.email === session.user.email);
  if (!user) {
    return {
      redirect: {
        destination: loginUrl,
        permanent: false
      }
    }
  }

  if (user.role !== 'admin') {
    return {
      redirect: {
        destination: '/403',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
