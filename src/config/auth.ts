import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import db from "@/db";
import { env } from "@/env/server";

const options: NextAuthOptions = {
  // Can change session strategy to not use DB if use of middleware.ts file is needed
  // session: {
  //   strategy: "jwt",
  // },
  pages: {
    signIn: "/",
  },
  // @ts-expect-error: Drizzle Adapter is for next auth v5 but we're using v4
  adapter: DrizzleAdapter(db),
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

export default options;
