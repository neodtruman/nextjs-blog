
import { IncomingForm } from "formidable";
import { getSession } from 'next-auth/react';
import path from 'path';
import fs from "fs";

// Every API route can export a config object to change the default configs, which are the following
// bodyParser is automatically enabled. If you want to consume the body as a stream or with raw-body, you can set this to false.
export const config = {
  api: {
    bodyParser: false
  }
};

async function saveFile(file, folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
  // Read content of the temporary file
  const data = fs.readFileSync(file.filepath);
  // Write the file at a specific folder
  const filePath = path.join(folderPath, file.originalFilename);
  fs.writeFileSync(filePath, data);
  // Delate the temporary file
  await fs.unlinkSync(file.filepath);
  return;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }

  let status = 200,
    resultBody = { status: 'ok', message: 'Post was created successfully.' };

  let postData = null;
  /* Get files using formidable */
  const files = await new Promise((resolve, reject) => {
    const form = new IncomingForm();
    const files = [];
    form.on('file', function (field, file) {
      files.push(file);
    })
    form.on('end', () => resolve(files));
    form.on('error', err => reject(err));
    form.parse(req, (err, fields, files) => {
      postData = fields;
    });
  }).catch(e => {
    status = 500;
    resultBody = {
      status: 'fail', message: 'Internal server error!'
    }
  });

  if (files?.length) {
    const folderPath = path.join(process.cwd(), 'public', 'images', 'posts', postData.slug);
    for (const file of files) {
      await saveFile(file, folderPath);
    }
  }

  const fileName = postData.slug + '.md';
  const filePath = path.join(process.cwd(), 'data', 'posts', fileName);

  const writer = fs.createWriteStream(filePath);

  const writeLine = (line) => writer.write(`\n${line}`);

  writer.write('---');
  writeLine(`title: ${postData.title}`);
  writeLine(`image: ${postData.thumb}`);
  writeLine(`excerpt: ${postData.excerpt}`);
  const createdDate = new Date().toISOString().substring(0, 10);
  writeLine(`date: "${createdDate}"`);
  const isFeatured = postData.isFeatured === 'on' ? 'true' : 'false';
  writeLine(`isFeatured: ${isFeatured}`);
  writeLine('---');
  writeLine(postData.content);
  writer.end() // close stream

  res.status(status).json(resultBody);
};
