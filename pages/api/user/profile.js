import { getSession } from 'next-auth/react';
import path from 'path';
import fs from 'fs';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return;
  }

  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }
  const email = session.user.email;

  // get all users
  const filePath = path.join(process.cwd(), 'data', 'users.json');
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  // Check if user existed
  const user = data.find(u => u.email === email);
  if (!user) {
    res.status(404).json({ message: 'Not found user!' });
    return;
  }
  user.password = undefined;
  res.status(200).json({ user });
}
