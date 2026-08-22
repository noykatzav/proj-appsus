const { useState, useEffect } = React
import { useEffectUpdate } from '../../../custom-hooks/useEffectUpdate.js'


export function MailFilter({ filterBy, sortBy, setFilterBy, setSortBy, defaultFilter, defaultSort}) {
	const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
	const [sortByToEdit, setSortByToEdit] = useState(sortBy)

	useEffectUpdate(() => {
		setFilterBy(filterByToEdit)
	}, [filterByToEdit])

	useEffectUpdate(() => {
		setSortBy(sortByToEdit)
        console.log(sortByToEdit)
	}, [sortByToEdit])

	function handleFilterChange(ev) {
		const { value, name, type, checked } = ev.target
        setFilterByToEdit(prev => ({
            ...prev,
            [name]:
                type === 'checkbox'
                    ? (checked ? false : undefined)
                    : type === 'text'
                        ? value
                        : +value
        }))
	}

    function handleSort(field) {
        setSortByToEdit(prev => {
            if (prev.sortField === defaultSort.sortField && prev.sortDir === -1) return {sortField: field, sortDir: 1}
            
            if (prev.sortField !== field) return {sortField: field, sortDir: 1}

            if (prev.sortDir === 1) return {sortField: field, sortDir: -1}

            return defaultSort
        })
    }

    function clearFilter() {
        setFilterByToEdit(defaultFilter)
    }

	return <section className="mail-filter">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input 
            onChange={ev => handleFilterChange(ev)} 
            value={filterByToEdit.txt} 
            type="text" 
            name="txt" 
            placeholder="Search mail" />

        <label className="unread-filter">
            <input 
                onChange={ev => handleFilterChange(ev)}
                checked={filterByToEdit.isRead === false}
                type="checkbox"
                name="isRead"
            />
            <span>Unread</span>
        </label>

        <button className="sort" onClick={() => handleSort('sentAt')}>
            Date
        </button>

        <button  className="sort" onClick={() => handleSort('subject')}>
            Title
        </button>

        <button className="btn-clear" onClick={clearFilter}>x</button>
    </section>
}
