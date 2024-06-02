'use client'

import { useEffect, useState } from "react"
import PromptCard from "@components/PromptCard"

const Feed = () => {
    const [search, setSearch] = useState('')
    const [prompts, setPrompts] = useState([])

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const fetchPrompts = async () => {
        const res = await fetch('api/prompt')
        const data = await res.json()

        setPrompts(data)
    }

    const handleTagClick = () => {
        console.log('Clicked')
    }

    useEffect(() => {
        fetchPrompts()
    }, [])

    return (
        <section className="feed">
            <form className='relative w-full flex-center'>
                <input
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search by a tag or username"
                    required
                    className='search_input peer'
                />
            </form>

            <PromptCardList data={prompts} handleTagClick={handleTagClick} />
        </section>
    )
}

export default Feed

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className="mt-16 prompt_layout">
            {data.map(post => (
                <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
            ))}
        </div>
    )
}