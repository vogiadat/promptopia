'use client'

import Profile from "@components/Profile"
import { useSession } from "next-auth/react"
import { useRouter, useParams } from "next/navigation"
import { useState, useEffect } from 'react'

const UserProfile = () => {
    const router = useRouter()
    const [prompts, setPrompts] = useState([])
    const [user, setUser] = useState(null)
    const { userId } = useParams()

    const fetchPrompts = async () => {
        const res = await fetch(`/api/user/${userId}/post`)
        const data = await res.json()

        return setPrompts(data)
    }

    const fetchUser = async () => {
        const res = await fetch(`/api/user/${userId}`)
        const data = await res.json()
        setUser(data)
    }

    useEffect(() => {
        fetchUser()
        if (userId) {
            fetchPrompts()
        }
    }, [userId])

    return user && (
        <Profile
            name={user.username}
            desc={`Welcome to ${user.username} profile page.`}
            data={prompts}
        />
    )
}

export default UserProfile