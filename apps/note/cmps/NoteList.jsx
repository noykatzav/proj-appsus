const { Link } = ReactRouterDOM

export function NoteList({ notes }) {
    return <section className="note-list">
        {notes.map(note => (
            <Link
                to={`/note/edit/${note.id}`}
                className="note-preview"
                key={note.id}
                style={note.style}
            >
                {note.info.txt}
            </Link>
        ))}
    </section>
}