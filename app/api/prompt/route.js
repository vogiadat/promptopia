import Prompt from "@models/prompt"
import { connectToDB } from "@utils/database"

export const GET = async (req, res) => {
    // const url = new URL(req.url, `http://${req.headers.host}`);
    // const searchParams = new URLSearchParams(url.search);
    // const search = searchParams.get('search');

    try {
        await connectToDB()
        const res = await Prompt.find().populate('creator')

        return new Response(JSON.stringify(res), { status: 200 })
    } catch (error) {
        return new Response('Fail to load data', { status: 500 })
    }
}