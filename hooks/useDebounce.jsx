import { useState, useEffect } from "react"

const useDebounce = (initialValue, wait) => {
    const [loading, setLoading] = useState(false)
    const [debounceValue, setDebounceValue] = useState(initialValue)

    useEffect(() => {
        setLoading(true)
        const timer = setTimeout(() => {
            setDebounceValue(initialValue)
        }, wait)

        return () => clearTimeout(timer)
    }, [wait, initialValue])

    return { debounceValue, loading }
}

export default useDebounce