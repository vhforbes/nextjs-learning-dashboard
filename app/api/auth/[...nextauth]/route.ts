import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const apiUrl = process.env.EXTERNAL_API_BASE_URL;

const handler = NextAuth({
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        email: { label: 'email', type: 'text', placeholder: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials, req) {
        if (!credentials) return null;

        const res = await fetch(`${apiUrl}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'vhforbes@gmail.com',
            password: '170496',
          }),
        });

        const user = await res.json();

        if (res.ok && user) {
          return user;
        }

        return null;
      },
    }),
  ],
});

// export { handler as GET, handler as POST };
