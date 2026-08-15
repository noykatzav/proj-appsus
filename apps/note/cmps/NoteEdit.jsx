const { useState, useEffect } = React

export function NoteEdit({ note, onSaveNote, onClose }) {
    const [editedNote, setEditedNote] = useState({
        ...note,
        info: { ...note.info }
    })

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        setEditedNote(prevNote => ({
            ...prevNote,
            info: {
                ...prevNote.info,
                [field]: value
            }
        }))
    }

    function onSave(){
        onSaveNote(editedNote)
    }

    return <div className="note-edit-overlay" onClick={onClose}>
            <div
                className="note-edit-modal"
                role="dialog"
                aria-modal="true"
                onClick={ev => ev.stopPropagation()}
            >
                <textarea
                    name="txt"
                    value={editedNote.info.txt}
                    onChange={handleChange}
                />

                <button onClick={onSave}>
                    Done
                </button>
            </div>
        </div>
}
    