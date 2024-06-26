// import NextAuth from 'next-auth';
// import { authConfig } from './auth.config';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { z } from 'zod';
// import { getUser } from './app/lib/data';
// import bcrypt from 'bcrypt';

// const apiUrl = process.env.EXTERNAL_API_BASE_URL;

// export const { auth, signIn, signOut } = NextAuth({
//   ...authConfig,
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',

//       credentials: {
//         username: {
//           label: 'email',
//           type: 'text',
//           placeholder: 'email@email.com',
//         },
//         password: { label: 'Password', type: 'password' },
//       },

//       async authorize(credentials, req) {
//         // You need to provide your own logic here that takes the credentials
//         // submitted and returns either a object representing a user or value
//         // that is false/null if the credentials are invalid.
//         // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
//         // You can also use the `req` object to obtain additional parameters
//         // (i.e., the request IP address)
//         const res = await fetch('/your/endpoint', {
//           method: 'POST',
//           body: JSON.stringify(credentials),
//           headers: { 'Content-Type': 'application/json' },
//         });

//         const user = await res.json();

//         // If no error and we have user data, return it
//         if (res.ok && user) {
//           return user;
//         }
//         // Return null if user data could not be retrieved
//         return null;
//       },

//       // async authorize(credentials, req) {
//       //   const parsedCredentials = z
//       //     .object({ email: z.string().email(), password: z.string().min(6) })
//       //     .safeParse(credentials);

//       //   if (parsedCredentials.success) {
//       //     const { email, password } = parsedCredentials.data;

//       //     //Using server actions logic
//       //     // const user = await getUser(email);
//       //     // if (!user) return null;

//       //     // const passwordsMatch = await bcrypt.compare(password, user.password);
//       //     // if (passwordsMatch) return user;]

//       //     console.log(apiUrl);

//       //     const response = await fetch(`${apiUrl}/auth/login`, {
//       //       method: 'POST',
//       //       headers: {
//       //         'Content-Type': 'application/json',
//       //       },
//       //       body: JSON.stringify({
//       //         email: 'vhforbes@gmail.com',
//       //         password: '170496',
//       //       }),
//       //     });

//       //     if (response.ok) {
//       //       const { accessToken } = await response.json();

//       //       return { accessToken };
//       //     }

//       //     // const response = await fetch(`${apiUrl}/`, {
//       //     //   method: 'GET',
//       //     //   // body: JSON.stringify({
//       //     //   //   email,
//       //     //   //   password,
//       //     //   // }),
//       //     // });

//       //     console.log(response);
//       //   }

//       //   console.log('Invalid Credentials');
//       //   return null;
//       // },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.accessToken = user.accessToken;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.accessToken = token.accessToken;
//       return session;
//     },
//   },
//   pages: {
//     signIn: '/login',
//   },
// });
