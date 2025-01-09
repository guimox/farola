import NextAuth from "next-auth";
import Google from "next-auth/providers/google"
import { setName } from "./actions/setNameServerAction";
import { clearStaleTokens } from "./actions/clearStaleTokens";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google], callbacks: {
        async jwt({ token, user, session, trigger }) {
            if (trigger === "update" && session?.name !== token.name) {
                token.name = session.name;
                if (token.name) {
                    try {
                        await setName(token.name);
                    } catch (error) {
                        console.error("Failed to set user name:", error);
                    }
                }

            }

            if (user) {
                await clearStaleTokens(); // Clear up any stale verification tokens from the database after a successful sign in
                return {
                    ...token,
                    id: user.id,
                };
            }
            return token;
        },
        async session({ session, token }) {
            console.log("session callback", { session, token });
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id as string,
                },
            };
        },
    },
})