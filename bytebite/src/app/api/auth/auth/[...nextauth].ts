import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import CredentialsProvider from 'next-auth/providers/credentials';

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (user) {
          // In a real app, you'd hash and compare passwords
          // For this example, we'll just check if the user exists
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
  },
});