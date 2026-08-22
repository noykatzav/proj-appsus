const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { NoteActions } from './NoteActions.jsx'
import { NotePreview } from './NotePreview.jsx'

export function NoteList({ notes, onRemoveNote, onSetNotesStyle, onTogglePin, onDuplicateNote, onToggleTodo }) {

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
                    title={note.isPinned ? 'Unpin note' : 'Pin note'}
                    onClick={() => onTogglePin(note)}>

                    <img
                        src={
                            note.isPinned
                                ? 'assets/imgs/pinned.svg'
                                : 'assets/imgs/pin.svg'
                        }
                        alt=""
                    />
                </button>

                <Link
                    to={`/note/edit/${note.id}`}
                    className="note-content"
                >
                    <NotePreview
                        note={note}
                        onToggleTodo={(todoIdx) => onToggleTodo(note, todoIdx)}
                    />
                </Link>

                <NoteActions
                    actions={['color', 'duplicate', 'delete']}
                    noteId={note.id}
                    isColorOpen={openColorNoteId === note.id}
                    onToggleColor={() => onToggleColor(note.id)}
                    selectedColor={note.style.backgroundColor}
                    onDuplicateNote={() => onDuplicateNote(note)}
                    onRemoveNote={onRemoveNote}
                    onSetStyle={(style) => onSetNotesStyle(note, style)}
                />

            </div>
        ))}
    </section>
}