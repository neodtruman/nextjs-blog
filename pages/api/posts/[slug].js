import path from 'path';
import fs from 'fs';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return;
  }
  const slug = req.query.slug;

  const filePath = path.join(process.cwd(), 'data', 'posts.json');
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  const post = data.find(p => p.slug === slug);
  res.status(200).json({ post });
}
