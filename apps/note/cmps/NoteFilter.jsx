const { useState } = React

import { useEffectUpdate } from '../custom-hooks/useEffectUpdate.js'

export function NoteFilter({ filterBy, onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffectUpdate(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange(ev) {
        const { value, name } = ev.target
        setFilterByToEdit(prev => ({ ...prev, [name]: value }))
    }

    function onSetType(type) {
        setFilterByToEdit(prevFilter => ({
            ...prevFilter,
            type

        }))
    }

    return <section className="note-filter">

        <input
            onChange={handleChange}
            value={filterByToEdit.txt}
            type="text"
            name="txt"
            placeholder="Search" />

        <div className="note-type-filter">
            <button onClick={() => onSetType('NoteTxt')}>Text</button>
            <button onClick={() => onSetType('NoteImg')}>Images</button>
            <button onClick={() => onSetType('NoteVideo')}>Videos</button>
            <button onClick={() => onSetType('NoteTodos')}>Todos</button>
        </div>
    </section>
}