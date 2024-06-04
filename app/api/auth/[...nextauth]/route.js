import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'

import User from "@models/user";
import { connectToDB } from "@utils/database";
import { formatUnikey } from "@utils/format";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SERCET
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({ email: session.user.email })
            session.user.id = sessionUser._id.toString()
            return session
        },

        async signIn({ profile }) {
            try {
                await connectToDB()

                const isExist = await User.findOne({ email: profile.email })


                if (!isExist) {
                    await User.create({
                        email: profile.email,
                        username: profile.email.split('@').at(0),
                        image: profile.picture
                    })
                }

                return true
            } catch (error) {
                console.log(error)
                return false
            }
        }
    }
})

export { handler as GET, handler as POST }