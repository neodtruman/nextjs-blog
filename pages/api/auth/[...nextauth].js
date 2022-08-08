import path from 'path';
import fs from 'fs';
import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import { comparePasswords } from '../../../utils/password-util';

export const authOptions = {
  session: {
    jwt: true
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // Get all users
        const filePath = path.join(process.cwd(), 'data', 'users.json');
        const fileData = fs.readFileSync(filePath);
        const data = JSON.parse(fileData);

        // Check if user existed
        const user = data.find(u => u.email === credentials.email);
        if (!user) {
          throw new Error('Not found user!');
        }

        const isPasswordValid = await comparePasswords(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error('Invalid user!!');
        }

        return {
          email: user.email
        }; // to be included in the JWT
      }
    })
  ]
}
export default NextAuth(authOptions);
