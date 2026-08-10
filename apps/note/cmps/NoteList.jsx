

export function NoteList({notes}) {
    return   <div className="note-list">
            {notes.map(note => (
                <div key={note.id}>
                    {note.info.txt}
                </div>
            ))}
        </div>
    
}
