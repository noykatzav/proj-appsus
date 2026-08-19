const {useState} = React

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

	return <section className="note-filter">
       
        <input 
            onChange={handleChange} 
            value={filterByToEdit.txt} 
            type="text" 
            name="txt" 
            placeholder="Search" />
    </section>
}