import NextAuth, { User } from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import _jwt from 'jsonwebtoken';

// import { getUser } from './app/lib/data';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { JWT } from 'next-auth/jwt';

interface CustomUser extends User {
  accessToken: string;
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          console.log(credentials);

          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              method: 'POST',
              body: JSON.stringify({
                email,
                password,
              }),
              headers: { 'Content-Type': 'application/json' },
            },
          );

          const data = await res.json();
          console.log(data);

          if (res.ok && data) {
            const decoded = _jwt.decode(data.accessToken) as { email: string }; // this is ugly

            cookies().set('accessToken', data.accessToken);

            return { email: decoded.email };
          } else {
            return null;
          }
        }

        console.log('Invalid Credentials');
        return null;
      },
    }),
  ],
  callbacks: {
    // Puts information that only exists in the api on the Next JWT
    async jwt({ token, user }) {
      console.log('Calling JWT Callback');

      if (user) {
        token.email = user.email;
        token.potato = 'potato';
        // token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.email = token.email!;

      return session;
    },
  },
  // events: {
  //   async signIn(message) {
  //     const { accessToken } = message;

  //     if (accessToken) {
  //       cookies().set('accessToken', accessToken, {
  //         maxAge: 30 * 24 * 60 * 60,
  //         path: '/',
  //       });
  //     }
  //   },
  //   // async signOut() {
  //   //   destroyCookie(null, 'accessToken');
  //   // },
  // },
});
