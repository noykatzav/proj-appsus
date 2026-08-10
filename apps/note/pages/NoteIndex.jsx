const { useState, useEffect } = React

import { NoteList } from '../cmps/NoteList.jsx'
import { noteService } from '../services/note.service.js'


export function NoteIndex() {
const [notes,setNotes] = useState([])

useEffect(()=>{
    loadNotes()
},[])

function loadNotes(){
    noteService.query()
    .then(setNotes)
}

    return <section className="container">
    <NoteList notes={notes}/>
    </section>
}
