const { useState, useEffect } = React

import { NoteList } from '../cmps/NoteList.jsx'
import { NoteHeader } from '../cmps/NoteHeader.jsx'
import { NoteAdd } from '../cmps/NoteAdd.jsx'
import { NoteEdit } from '../cmps/NoteEdit.jsx'
import { noteService } from '../services/note.service.js'


export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [selectedNote, setSelectedNote] = useState(null)

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


    function onSaveNote(note) {
        noteService.save(note)
            .then(() => {
                loadNotes()
                setSelectedNote(null)

            })
    }

    function onSelectNote(note) {
         console.log('selected note:', note)
        setSelectedNote(note)
    }

    function getNoteEdit() {
        if (!selectedNote) return null

        return (
            <NoteEdit
                note={selectedNote}
                onSaveNote={onSaveNote}
                onClose={() => setSelectedNote(null)}
            />
        )
    }
    return <section className="notes-container">
        <NoteHeader />
        <NoteAdd onAddNote={onAddNote} />
        <NoteList notes={notes} onSelectNote={onSelectNote} />
        {getNoteEdit()}
    </section>
}
