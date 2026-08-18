import { NoteActions } from '../cmps/NoteActions.jsx'

const { Link } = ReactRouterDOM

export function NoteList({ notes, onRemoveNote }) {
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
                    actions={['delete']}
                    noteId={note.id}
                    onRemoveNote={onRemoveNote}
                />

            </div>
        ))}
    </section>
}