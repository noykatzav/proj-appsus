const {useState} = React
const { Link } = ReactRouterDOM

import { NoteActions } from './NoteActions.jsx'

export function NoteList({ notes, onRemoveNote, onSetNotesStyle }) {

const[openColorNoteId, setOpenColorNoteId] = useState(null)

function onToggleColor(noteId){
    setOpenColorNoteId(prevNoteId =>
        prevNoteId === noteId ? null : noteId
    )
}

    return <section className="note-list">
        {notes.map(note => (
            <div
                className="note-preview"
                key={note.id}
                style={note.style}
            >

                <Link
                    to={`/note/edit/${note.id}`}
                    className="note-content"
                >
                    {note.info.txt}
                </Link>

                <NoteActions
                    actions={['color','delete']}
                    noteId={note.id}
                    isColorOpen={openColorNoteId === note.id}
                    onToggleColor={()=>onToggleColor(note.id)}
                    selectedColor={note.style.backgroundColor}
                    onRemoveNote={onRemoveNote}
                    onSetStyle={(style) => onSetNotesStyle(note,style)}
                />

            </div>
        ))}
    </section>
}