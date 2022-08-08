import path from 'path';
import fs from 'fs';
import { hashPassword } from '../../../utils/password-util';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }
  const { email, password } = req.body;

  if (!email || !email.includes('@') || !password || password.trim().length < 8) {
    res.status(422).json({ message: 'Invalid email or password! Minimum password length is 8.' });
    return;
  }

  // connect db and get all users
  const filePath = path.join(process.cwd(), 'data', 'users.json');
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  // Check if user existed
  const existingUser = data.find(u => u.email === email);
  if (existingUser) {
    res.status(422).json({ message: 'User existed!' });
    return;
  }

  const hashedPassword = await hashPassword(password);
  data.push({ email, password: hashedPassword });

  fs.writeFileSync(filePath, JSON.stringify(data));

  res.status(201).json({ message: 'Created user successfully.' });
}
