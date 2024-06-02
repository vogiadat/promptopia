'use client'

import { useEffect, useState } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"

import Form from "@components/Form"

const UpdatePrompt = () => {
    const { id } = useParams()
    const { data: session } = useSession()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })

    const updatePrompt = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch(`/api/prompt/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })

            if (res.ok) return router.push('/')
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const fetchPromptById = async () => {
        const res = await fetch(`/api/prompt/${id}`)
        const data = await res.json()

        setPost({
            prompt: data.prompt,
            tag: data.tag
        })
    }

    useEffect(() => {
        fetchPromptById()
    }, [])

    return (
        <Form
            type={"Update"}
            post={post}
            setPost={setPost}
            loading={loading}
            handleSubmit={updatePrompt}
        />
    )
}

export default UpdatePrompt