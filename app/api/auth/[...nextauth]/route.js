// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "WordPress",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "yourusername" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(
            "https://mothership.wordifysites.com/wp-json/jwt-auth/v1/token",
            {
              username: credentials.username,
              password: credentials.password,
            }
          );

          console.log("WordPress API Response:", response.data);

          if (response.data && response.data.token) {
            return {
              id: response.data.user_id,
              username: response.data.user_nicename,
              email: response.data.user_email,
              token: response.data.token,
            };
          } else {
            console.error("Invalid login attempt:", response.data);
            throw new Error("Invalid username or password");
          }
        } catch (error) {
          console.error("Authentication failed:", error.response?.data || error.message);
          throw new Error("Authentication failed. Check server logs.");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        username: token.username,
        email: token.email,
        token: token.token,
      };
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
