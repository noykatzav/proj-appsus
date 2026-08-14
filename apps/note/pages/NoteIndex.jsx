const { useState, useEffect } = React

import { NoteList } from '../cmps/NoteList.jsx'
import { NoteHeader } from '../cmps/NoteHeader.jsx'
import { NoteAdd } from '../cmps/NoteAdd.jsx'
import { noteService } from '../services/note.service.js'


export function NoteIndex() {
    const [notes, setNotes] = useState([])

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query()
            .then(setNotes)
    }

    function onAddNote(txt){
        const note = noteService.getEmptyNote(txt)
        noteService.save(note)
        .then(loadNotes)
    }

    return <section className="notes-container">
        <NoteHeader />
        <NoteAdd onAddNote={onAddNote} />
        <NoteList notes={notes} />
    </section>
}
