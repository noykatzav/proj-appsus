import { NoteActions } from './NoteActions.jsx'

const { Link } = ReactRouterDOM

export function NoteList({ notes, onRemoveNote, onSetNotesStyle }) {
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
                    selectedColor={note.style.backgroundColor}
                    onRemoveNote={onRemoveNote}
                    onSetStyle={(style) => onSetNotesStyle(note,style)}
                />

            </div>
        ))}
    </section>
}