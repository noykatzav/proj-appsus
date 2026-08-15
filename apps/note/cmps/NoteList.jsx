

export function NoteList({notes, onSelectNote}) {
    return <section className="note-list">
            {notes.map(note => (
                <div 
                className="note-preview"
                key={note.id}
                style={note.style}    
                onClick={()=> onSelectNote(note)}
                >
                    {note.info.txt}
                </div>
            ))}
    </section>
}
