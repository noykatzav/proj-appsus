export function NoteActions({ actions, noteId, onRemoveNote }) {
    function getActionButton(action) {
        switch (action) {
            case 'delete':
                return <button
                    key={action}
                    type="button"
                    onClick={() => onRemoveNote(noteId)}
                >
                    <img src="assets/imgs/trash.svg" alt="Delete" title="Delete" />
                </button>

            default:
                return null

        }
    }


    return <div className="note-actions">
        {actions.map(action => getActionButton(action))}
    </div>
}