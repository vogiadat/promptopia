import User from "@models/user"
import { connectToDB } from "@utils/database"

export const GET = async (req, res) => {
    const { id } = res.params
    try {
        await connectToDB()
        const user = await User.findById(id)

        return new Response(JSON.stringify(user), { status: 200 })
    } catch (error) {
        return new Response("Failed to load data user", { status: 500 })
    }
}