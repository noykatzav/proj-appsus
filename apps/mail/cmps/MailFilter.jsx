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
        <i className="fa-solid fa-magnifying-glass"></i>
        <input 
            onChange={ev => handleChange(ev)} 
            value={filterByToEdit.txt} 
            type="text" 
            name="txt" 
            placeholder="Search mail" />

        <button className="btn-clear" onClick={clearFilter}>x</button>
    </section>
}
