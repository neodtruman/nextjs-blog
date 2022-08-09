import { getSession } from 'next-auth/react';
import path from 'path';
import fs from 'fs';
import { comparePasswords, hashPassword } from '../../../utils/password-util';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }

  const newPassword = req.body.newPassword;
  if (!newPassword || newPassword.trim().length < 8) {
    res.status(422).json({ message: 'Invalid new password! Minimum password length is 8.' });
    return;
  }
  const oldPassword = req.body.oldPassword;
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

  // comparePasswords(plainText, hash)
  const isPasswordValid = await comparePasswords(oldPassword, user.password);
  if (!isPasswordValid) {
    res.status(403).json({ status: 'error', message: 'Invalid old password!' });
    return;
  }
  user.password = await hashPassword(newPassword);

  fs.writeFileSync(filePath, JSON.stringify(data));

  res.status(201).json({ status: 'success', message: 'Updated password successfully.' });
}
