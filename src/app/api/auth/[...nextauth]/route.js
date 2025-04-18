import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/utils/db";
import User from "@/models/user.model";


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({ email: session.user.email });
            session.user.id = sessionUser._id.toString();
            return session;
        },


        async signIn({ profile }) {
            console.log(profile);
            
            try {
                await connectToDB();
                // check if user already exists 
                const userExists = await User.findOne({ email: profile.email });

                // if not, create a new user
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture,
                    });
                }

                return true
            } catch (error) {
                console.log("Error checking if user exists: ", error);
                return false
            }
        },
    },

    session: {
        maxAge: 24 * 60 * 60,
    },
});

export { handler as GET, handler as POST };