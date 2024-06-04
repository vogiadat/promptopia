'use client'

import Profile from "@components/Profile"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from 'react'

const MyProfile = () => {
    const router = useRouter()
    const { data: session } = useSession()
    const [prompts, setPrompts] = useState([])

    const fetchPrompts = async () => {
        const res = await fetch(`api/user/${session.user.id}/post`)
        const data = await res.json()
        setPrompts(data)
    }

    useEffect(() => {
        if (session?.user) fetchPrompts()
    }, [session?.user])

    const handleEdit = async (post) => {
        return router.push(`update-prompt/${post._id}`)
    }
    const handleDelete = async (post) => {
        const isConfirm = confirm(`Do you want to delete post id: ${post._id}`)

        if (isConfirm) {
            await fetch(`api/prompt/${post._id}`, {
                method: 'DELETE'
            })

            const newPrompts = prompts.filter(p => p._id !== post._id)
            return setPrompts(newPrompts)
        }
    }

    return (
        <Profile
            name='My'
            desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
            data={prompts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile