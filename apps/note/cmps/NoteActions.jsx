import { ColorPicker } from './ColorPicker.jsx'

const { useState } = React

export function NoteActions({ actions, noteId, isColorOpen, onToggleColor, selectedColor, onRemoveNote, onSetStyle }) {

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

            default:
                return null

        }
    }


    return <div className="note-actions-container">
        <div className="note-actions">
            {actions.map(action => getActionButton(action))}
        </div>

        {isColorOpen
            ? <ColorPicker selectedColor={selectedColor} onSetStyle={onSetStyle} />
            : null
        }
    </div>
}