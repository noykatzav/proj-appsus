const { useState, useEffect, useRef } = React
const { useParams, useNavigate } = ReactRouterDOM

import { noteService } from '../services/note.service.js'

export function NoteEdit({ onSaveNote }) {
    const [note, setNote] = useState(null)
    const textAreaRef = useRef(null)

    const { noteId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadNote()
    }, [noteId])

    useEffect(() => {
        if (!note) return
        textAreaRef.current.style.height = 'auto'
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px'
    }, [note])

    function loadNote() {
        noteService.get(noteId)
            .then(setNote)
    }


    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        target.style.height = 'auto'
        target.style.height = target.scrollHeight + 'px'

        setNote(prevNote => ({
            ...prevNote,
            info: {
                ...prevNote.info,
                [field]: value
            }
        }))
    }

    function onSave() {
        noteService.save(note)
            .then(() => {
                onSaveNote()
                navigate('/note')
            })
    }

    if (!note) return null
    return <div className="note-edit-backdrop" onClick={onSave}>
        <div
            className="note-edit-modal"
            onClick={ev => ev.stopPropagation()}
        >

            {note.type === 'NoteImg' && note.info.url &&
                <img
                    className="note-edit-img"
                    src={note.info.url}
                    alt=""
                />
            }

            {note.type === 'NoteVideo' && note.info.url &&
                <iframe
                    className="note-edit-video"
                    src={noteService.getYoutubeEmbedUrl(note.info.url)}
                    title="YouTube video"
                    allowFullScreen
                ></iframe>
            }
            <textarea
                className="note-edit-textarea"
                ref={textAreaRef}
                name="txt"
                value={note.info.txt || ''}
                placeholder="Take a note..."
                onChange={handleChange}
            />

            <button onClick={onSave}>
                Save
            </button>
        </div>
    </div>
}
