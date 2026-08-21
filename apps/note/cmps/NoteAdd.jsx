import { NoteActions } from "./NoteActions.jsx"

const { useState, useRef } = React


export function NoteAdd({ onAddNote }) {
    const [info, setInfo] = useState({ txt: '' })
    const [isExpanded, setIsExpanded] = useState(false)
    const textareaRef = useRef(null)

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        target.style.height = 'auto'
        target.style.height = target.scrollHeight + 'px'

        setInfo(prevInfo => ({
            ...prevInfo,
            [field]: value
        }))
    }

    function onSaveNote() {
        if (!info.txt.trim()) return

        onAddNote(info.txt)
        setInfo({ txt: '' })
        setIsExpanded(false)
        textareaRef.current.style.height = '50px'
    }

    function handleImgUpload(file) {
        const reader = new FileReader()

        reader.onload = () => {
            console.log(reader.result)
            setIsExpanded(true)

        }
        reader.readAsDataURL(file)
    }

    return <section className={`note-add ${isExpanded ? 'expanded' : ''}`}>
        <textarea
            ref={textareaRef}

            name="txt"
            value={info.txt}
            placeholder="Take a note..."
            onChange={handleChange}
            onFocus={() => setIsExpanded(true)}
        />

        {!isExpanded &&
            <NoteActions
                actions={['image']}
                onImgUpload={handleImgUpload}
            />
        }

        {isExpanded &&
            <button className="note-close-btn" onClick={onSaveNote}>
                Add
            </button>}

    </section>
}

