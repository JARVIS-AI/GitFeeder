import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.username = token.login;
      return session;
    },
    async jwt({ token, account, profile }) {
      if (account?.provider === "github") {
        token.login = profile?.login;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions); // 👈 This is what was missing