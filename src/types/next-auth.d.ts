declare module "next-auth" {
  interface Session {
    username?: string;
  }
}

export {};
