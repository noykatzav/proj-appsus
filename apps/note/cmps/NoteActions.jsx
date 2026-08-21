import { ColorPicker } from './ColorPicker.jsx'

const { useState } = React
const { useRef } = React

export function NoteActions({
    actions,
    noteId,
    isColorOpen,
    onToggleColor,
    selectedColor,
    onRemoveNote,
    onSetStyle,
    onDuplicateNote,
    onImgUpload
}) {

    const imgInputRef = useRef(null)

    // const [isColorOpen, setIsColorOpen] = useState(false)

    // function onToggleColor() {
    //     setIsColorOpen(prevIsOpen => !prevIsOpen)
    // }

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

            case 'color':
                return <button
                    key={action}
                    type="button"
                    onClick={onToggleColor}
                >
                    <img src="assets/imgs/color_icon.svg" alt="color" title="Background Color" />

                </button>

            case 'duplicate':
                return <button
                    key={action}
                    type="button"
                    onClick={onDuplicateNote}
                >
                    <img src="assets/imgs/duplicate.png" alt="duplicate" title="Duplicate note" />
                </button>

            case 'image':
                return <button
                    key={action}
                    type="button"
                    onClick={() => imgInputRef.current.click()}
                >
                    <img src="assets/imgs/img_icon.svg" alt="image" title="Add image" />
                </button>

            default:
                return null

        }
    }

    function handleFileChange(ev) {
        const file = ev.target.files[0]

        if (!file) return
        
        onImgUpload(file)
    }

    return <div className="note-actions-container"
        onClick={ev => ev.stopPropagation()}
    >
        <div className="note-actions">
            {actions.map(action => getActionButton(action))}
        </div>

        <input ref={imgInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
        />

        {isColorOpen
            ? <ColorPicker selectedColor={selectedColor} onSetStyle={onSetStyle} />
            : null
        }
    </div>
}