import { NoteActions } from "./NoteActions.jsx"

const { useState, useRef } = React


export function NoteAdd({ onAddNote }) {
    const [info, setInfo] = useState({ txt: '' })
    const [isExpanded, setIsExpanded] = useState(false)
    const textareaRef = useRef(null)
    const [noteType, setNoteType] = useState('NoteTxt')

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
        if (noteType === 'NoteTxt' && info.txt.trim()) {
            onAddNote(noteType, info)
        }
        if (noteType === 'NoteImg' && info.url) {
            onAddNote(noteType, info)
        }

        setInfo({ txt: '' })
        setNoteType('NoteTxt')
        setIsExpanded(false)
        textareaRef.current.style.height = '50px'
    }

    function handleImgUpload(file) {
        const reader = new FileReader()

        reader.onload = () => {
            setNoteType('NoteImg')
            setInfo(prevInfo => ({
                ...prevInfo,
                url: reader.result
            }))

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

        {noteType === 'NoteImg' && info.url &&
            <img
                className="note-add-img"
                src={info.url}
                alt=""
            />
        }

        {!isExpanded &&
            <NoteActions
                actions={['image']}
                onImgUpload={handleImgUpload}
            />
        }

        {isExpanded &&
            <button className="note-close-btn" onClick={onSaveNote}>
                Close
            </button>}

    </section>
}

