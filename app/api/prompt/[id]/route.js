import Prompt from "@models/prompt"
import { connectToDB } from "@utils/database"

export const GET = async (req, res) => {
    const { id } = res.params

    try {
        await connectToDB()
        const prompt = await Prompt.findById(id).populate('creator')

        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        return new Response('Failed to load data', { status: 500 })
    }
}

export const PATCH = async (req, res) => {
    const { id } = res.params
    const data = await req.json()

    try {
        await connectToDB()
        const prompt = await Prompt.findByIdAndUpdate(id, data)

        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        return new Response('Failed to load data', { status: 500 })
    }
}

export const DELETE = async (req, res) => {
    const { id } = res.params

    try {
        await connectToDB()
        await Prompt.findByIdAndDelete(id)

        return new Response(JSON.stringify(`Delete success ${id}`), { status: 200 })
    } catch (error) {
        return new Response('Failed to delete data', { status: 500 })
    }
}