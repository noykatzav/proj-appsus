const { useState } = React

export function NoteAdd({ onAddNote }) {
    const [info, setInfo] = useState({ txt: '' })

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        target.style.height = 'auto'
        target.style.height = target.scrollHeight + 'px'

        setInfo(prevInfo => ({
            ...prevInfo,
            [field]: value
        }))
    }

    function onSaveNote() {
        if (!info.txt.trim()) return

        onAddNote(info.txt)
        setInfo({ txt: '' })
    }

    return  <section className="note-add">
            <textarea
                name="txt"
                value={info.txt}
                placeholder="Take a note..."
                onChange={handleChange}
            />

            <button className="note-close-btn" onClick={onSaveNote}>
                Done
            </button>
        </section>
}

