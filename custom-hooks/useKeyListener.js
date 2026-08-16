const { useEffect } = React

export function useKeyListener(keys, handler) {
    function onKeyDown(ev) {
        if (!Array.isArray(keys)) keys = [keys]
        if (keys.includes(ev.key)) handler(ev)
    }

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [])
}