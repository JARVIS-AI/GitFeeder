import NextAuth, { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { JWT } from "next-auth/jwt";
import { Account, Profile, Session, User } from "next-auth";

interface GitHubProfile extends Profile {
  login: string;
}

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
      session.username = token.login as string; // ✅ use login here
      return session;
    },
    async jwt({
      token,
      account,
      profile,
    }: {
      token: JWT;
      user?: User | null;
      account?: Account | null;
      profile?: Profile;
      trigger?: "signIn" | "signUp" | "update";
      isNewUser?: boolean;
      session?: Session;
    }): Promise<JWT> {
      if (account?.provider === "github") {
        token.login = (profile as GitHubProfile).login;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);