const { useState } = React

import { useEffectUpdate } from '../../../custom-hooks/useEffectUpdate.js'
import { noteService } from '../services/note.service.js'


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

    function clearFilter() {
        setFilterByToEdit(noteService.getDefaultFilter())
    }

    return <section className="note-filter">

        <div className="filter-container">

            <div className="search-container">
                <input
                    onChange={handleChange}
                    value={filterByToEdit.txt}
                    type="text"
                    name="txt"
                    placeholder="Search" />

                {(filterByToEdit.txt || filterByToEdit.type)
                    ? <button type="button"
                        className="btn-clear-search"
                        onClick={clearFilter}
                        title="Clear search"> ×
                    </button>
                    : null
                }

            </div>

            <div className="note-type-filter">
                <button onClick={() => onSetType('NoteTxt')}>Text</button>
                <button onClick={() => onSetType('NoteImg')}>Images</button>
                <button onClick={() => onSetType('NoteVideo')}>Videos</button>
                <button onClick={() => onSetType('NoteTodos')}>Todos</button>
            </div>
        </div>
    </section>
}