

export function NoteList({notes}) {
    return <section className="note-list">
            {notes.map(note => (
                <div 
                className="note-preview"
                key={note.id}
                style={note.style}    
                >
                    {note.info.txt}
                </div>
            ))}
    </section>
}
