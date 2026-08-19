const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

import { NoteList } from '../cmps/NoteList.jsx'
import { NoteHeader } from '../cmps/NoteHeader.jsx'
import { NoteAdd } from '../cmps/NoteAdd.jsx'
import { NoteEdit } from './NoteEdit.jsx'
import { noteService } from '../services/note.service.js'


export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const { noteId } = useParams()

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query()
            .then(setNotes)
    }

    function onAddNote(txt) {
        const note = noteService.getEmptyNote(txt)
        noteService.save(note)
            .then(loadNotes)
    }
    function getNoteEdit() {
        if (!noteId) return null

        return (
            <NoteEdit
                onSaveNote={loadNotes}
            />
        )
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(loadNotes)
    }

    function onSetNotesStyle(note, style) {
        const updatedNote = {
            ...note,
            style: {
                ...note.style,
                ...style
            }
        }

        noteService.save(updatedNote)
            .then(loadNotes)
    }

    return <section className="notes-container">
        <NoteHeader />
        <NoteAdd onAddNote={onAddNote} />
        <NoteList notes={notes} onRemoveNote={onRemoveNote} onSetNotesStyle={onSetNotesStyle} />
        {getNoteEdit()}
    </section>
}
