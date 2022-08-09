
import { getSession } from 'next-auth/react';
import path from 'path';
import fs from 'fs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }

  const createdDate = new Date().toISOString().substring(0, 10);
  const newPost = {
    ...req.body,
    date: createdDate
  };

  const filePath = path.join(process.cwd(), 'data', 'posts.json');
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  data.push(newPost);
  fs.writeFileSync(filePath, JSON.stringify(data));

  res.status(201).json({ message: 'Success', post: newPost });
}
