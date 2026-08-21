const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

import { NoteList } from '../cmps/NoteList.jsx'
import { NoteHeader } from '../cmps/NoteHeader.jsx'
import { NoteAdd } from '../cmps/NoteAdd.jsx'
import { NoteEdit } from './NoteEdit.jsx'
import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { noteService } from '../services/note.service.js'
import { useEffectUpdate } from '../../../custom-hooks/useEffectUpdate.js'
import { utilService } from '../../../services/util.service.js'




export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const { noteId } = useParams()
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())


    useEffect(() => {
        loadNotes(filterBy)
    }, [])

    useEffectUpdate(() => {
        loadNotes(filterBy)
    }, [filterBy])


    function loadNotes() {
        noteService.query(filterBy)
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

    function onTogglePin(note) {
        const updatedNote = {
            ...note,
            isPinned: !note.isPinned,
            pinnedAt: !note.isPinned ? utilService.getCurrentTimestamp() : null
        }
        noteService.save(updatedNote)
            .then(loadNotes)
    }

    return <section className="notes-container">
        <div className="note-top-bar">
            <NoteHeader />
            <NoteFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
        </div>

        <NoteAdd onAddNote={onAddNote} />
        <NoteList notes={notes} onRemoveNote={onRemoveNote} onSetNotesStyle={onSetNotesStyle} onTogglePin={onTogglePin} />
        {getNoteEdit()}

    </section>
}
