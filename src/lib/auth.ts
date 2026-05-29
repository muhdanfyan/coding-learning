import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (
          credentials?.email === 'guru@sekolah.sch.id' &&
          credentials?.password === 'guru123'
        ) {
          return {
            id: '1',
            name: 'Guru Coding',
            email: 'guru@sekolah.sch.id',
            image: null,
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const protectedPaths = ['/dashboard'];
      const isProtected = protectedPaths.some((path) =>
        nextUrl.pathname.startsWith(path)
      );
      if (isProtected && !isLoggedIn) {
        return false;
      }
      return true;
    },
  },
};

export const { auth, signIn, signOut } = {
  auth: async () => null,
  signIn: async () => {},
  signOut: async () => {},
};
