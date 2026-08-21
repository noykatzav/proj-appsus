const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { NoteActions } from './NoteActions.jsx'

export function NoteList({ notes, onRemoveNote, onSetNotesStyle, onTogglePin }) {

    const [openColorNoteId, setOpenColorNoteId] = useState(null)

    function onToggleColor(noteId) {
        setOpenColorNoteId(prevNoteId =>
            prevNoteId === noteId ? null : noteId
        )
    }

    useEffect(() => {
        function onCllickOutside() {
            setOpenColorNoteId(null)
        }

        document.addEventListener('click', onCllickOutside)
        return () => {
            document.removeEventListener('click', onCllickOutside)
        }
    }, [])

    return <section className="note-list">
        {notes.map(note => (
            <div
                className="note-preview"
                key={note.id}
                style={note.style}
            >

                <button className="btn-pin"
                    type="button"
                    title="Pin note"
                    onClick={()=>onTogglePin(note)}>
                        
                    <img src="assets/imgs/pin.svg" alt="" />
                </button>

                <Link
                    to={`/note/edit/${note.id}`}
                    className="note-content"
                >
                    {note.info.txt}
                </Link>

                <NoteActions
                    actions={['color', 'delete']}
                    noteId={note.id}
                    isColorOpen={openColorNoteId === note.id}
                    onToggleColor={() => onToggleColor(note.id)}
                    selectedColor={note.style.backgroundColor}
                    onRemoveNote={onRemoveNote}
                    onSetStyle={(style) => onSetNotesStyle(note, style)}
                />

            </div>
        ))}
    </section>
}