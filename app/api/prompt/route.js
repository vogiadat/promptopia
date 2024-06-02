import Prompt from "@models/prompt"
import { connectToDB } from "@utils/database"

export const GET = async () => {
    try {
        await connectToDB()
        const res = await Prompt.find().populate('creator')

        return new Response(JSON.stringify(res), { status: 200 })
    } catch (error) {
        return new Response('Fail to load data', { status: 500 })
    }
}