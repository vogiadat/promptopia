import Prompt from "@models/prompt"

export const GET = async (req, res) => {
    const { id } = res.params
    try {
        const res = await Prompt.find({ creator: id }).populate('creator')
        return new Response(JSON.stringify(res), { status: 200 })

    } catch (error) {
        return new Response("Failed to fetch data", { status: 500 })
    }
}