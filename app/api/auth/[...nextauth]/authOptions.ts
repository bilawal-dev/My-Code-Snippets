import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Account, Session } from "next-auth";
import { User } from "next-auth";
import connectToDB from "@/db/connectToDB";
import userAuthModel from "@/db/models/UserAuthSchema";
import bcrypt from "bcryptjs";

//The need to extend JWT and Session interfaces arises from the fact that the default types provided by next-auth do not include custom fields like id. By extending these interfaces, we explicitly tell TypeScript that our JWT and Session objects will have additional properties, thus ensuring type safety and avoiding TypeScript errors.

// Extend JWT to include custom fields like 'id'
interface CustomJWT extends JWT {
    id?: string;
}

// Extend Session to include custom fields like 'id'
interface CustomSession extends Session {
    user: {
        id?: string;
        name?: string;
        email?: string;
    };
}

export const authOptions: any = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or password");
                }

                try {
                    await connectToDB();

                    const user = await userAuthModel.findOne({ email: credentials.email });

                    if (!user) {
                        throw new Error("User With This Email Doesn't Exist!");
                    }

                    const isValidPassword = await bcrypt.compare(credentials?.password, user.password);

                    if (!isValidPassword) {
                        throw new Error("Invalid Password!");
                    }

                    console.log('ALL _ OKEY ');

                    return user;

                } catch (error) {
                    // Customize error message
                    const customError = new Error(error as string);
                    customError.name = "Credentials Sign-In";
                    throw customError;
                }
            }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
    ],
    callbacks: {
        // async signIn({ user }: { user: User }) {
        //     await connectToDB();

        //     const existingUser = await userModel.findOne({ userId: user.id });

        //     if (!existingUser) {
        //         // If the user doesn't exist, create a new one
        //         const newuser = await userModel.create({
        //             userId: user.id,
        //             email: user.email,
        //         });
        //     }

        //     return true; // Return true to indicate successful sign-in
        // },
        async jwt({ token, user, account }: { token: CustomJWT, user: User, account: Account }) {
            if (user) {
                //The user.id value comes from the user authentication providers (GitHub, Google, or custom credentials).
                token.id = user.id;

                if (account?.provider === 'credentials') {
                    token.email = user.email;
                    token.name = user.name;
                }

            }
            return token;
        },
        async session({ session, token, account }: { session: CustomSession, token: CustomJWT, account: Account }) {
            session.user.id = token.id;

            if (account?.provider === 'credentials') {
                session.user.email = token.email as string;
                session.user.name = token.name as string;
            }

            return session;
        },
    },
    pages: {
        //To Redirect User To Custom Sign In Page When Signing In:
        signIn: '/sign-in'
    },
    secret: process.env.NEXTAUTH_SECRET as string,
};