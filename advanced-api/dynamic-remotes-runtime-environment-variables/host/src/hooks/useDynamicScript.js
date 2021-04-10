import { useState, useEffect } from 'react'

const useDynamicScript = (args) => {
    const [ready, setReady] = useState(false)
    const [failed, setFailed] = useState(false)

    useEffect(() => {
        if (!args.url) {
            return
        }

        const element = document.createElement('script')

        element.src = args.url
        element.type = 'text/javascript'
        element.async = true

        setReady(false)
        setFailed(false)

        element.onload = () => {
            console.log(`Dynamic Script Loaded: ${args.url}`)
            setReady(true)
        }

        element.onerror = () => {
            console.error(`Dynamic Script Error: ${args.url}`)
            setReady(false)
            setFailed(true)
        }

        document.head.appendChild(element)

        return () => {
            console.log(`Dynamic Script Removed: ${args.url}`)
            document.head.removeChild(element)
        }
    }, [args.url])

    return {
        ready,
        failed,
    }
}

export default useDynamicScript
