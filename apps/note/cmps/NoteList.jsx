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

                <div className="note-actions">
                    <button
                        type="button"
                        onClick={() => onRemoveNote(note.id)}
                    >
                        <img src="imgs/trash.svg" alt="Delete" />
                    </button>
                </div>
            </div>
        ))}
    </section>
}