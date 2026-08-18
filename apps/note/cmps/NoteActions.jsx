export function NoteActions({noteId, onRemoveNote}){
return <div className="note-actions">
                    <button
                        type="button"
                        onClick={() => onRemoveNote(noteId)}
                    >
                        <img src="assets/imgs/trash.svg" alt="Delete" title="Delete" />
                    </button>
                </div>

}