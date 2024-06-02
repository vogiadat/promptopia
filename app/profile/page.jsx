'use client'

import Profile from "@components/Profile"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from 'react'

const MyProfile = () => {
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

    const handleEdit = async () => { }
    const handleDelete = async () => { }

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