const { useState, useEffect } = React
import { useEffectUpdate } from '../../../custom-hooks/useEffectUpdate.js'


export function MailFilter({ filterBy, setFilterBy, defaultFilter}) {
	const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

	useEffectUpdate(() => {
		setFilterBy(filterByToEdit)
	}, [filterByToEdit])

	function handleChange(ev) {
		const { value, name, type } = ev.target
		setFilterByToEdit(prev => ({ ...prev, [name]: type === 'text' ? value : +value }))
	}

    function clearFilter() {
        setFilterByToEdit(defaultFilter)
    }

	return <section className="mail-filter">
        <input 
            onChange={ev => handleChange(ev)} 
            value={filterByToEdit.txt} 
            type="text" 
            name="txt" 
            placeholder="Search mail" />

        <button onClick={clearFilter}>Clear</button>
    </section>
}
