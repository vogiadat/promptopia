'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import Form from "@components/Form"

const CreatePrompt = () => {
    const { data: session } = useSession()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })

    const createPrompt = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch('/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({
                    userId: session?.user.id,
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

    return (
        <Form
            type={"Create"}
            post={post}
            setPost={setPost}
            loading={loading}
            handleSubmit={createPrompt}
        />
    )
}

export default CreatePrompt