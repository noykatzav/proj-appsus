const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

import { noteService } from '../services/note.service.js'

export function NoteEdit({ onSaveNote, onClose }) {
    const [note, setNote] = useState(null)

    const { noteId } = useParams()
    const navigate = useNavigate()

      useEffect(() => {
        loadNote()
    }, [noteId])

function loadNote() {
        noteService.get(noteId)
            .then(setNote)
    }


    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        setNote(prevNote => ({
            ...prevNote,
            info: {
                ...prevNote.info,
                [field]: value
            }
        }))
    }

    function onSave(){
        noteService.save(note)
            .then(() => {
               onSaveNote()
                navigate('/note')
            })
    }

    if (!note) return null
    return <div className="note-edit-backdrop" onClick={onClose}>
            <div
                className="note-edit-modal"
                onClick={ev => ev.stopPropagation()}
            >
                <textarea
                    name="txt"
                    value={note.info.txt}
                    onChange={handleChange}
                />

                <button onClick={onSave}>
                    Done
                </button>
            </div>
        </div>
}
    