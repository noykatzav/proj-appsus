
const { useState, useEffect } = React

import { useEffectUpdate } from '../../../custom-hooks/useEffectUpdate.js'


export function MailMenu({ mails, loggedUser, setFilterBy, clearFilter, chosenBox, setChosenBox}) {
    const [mailCnt, setMailCnt] = useState(0)


    const mailBoxes = [
        {
            name: 'Inbox',
            filterBy: {to: loggedUser.email},
            icon: <i className="fa-solid fa-inbox"></i>
        },
        {
            name: 'Starred',
            filterBy: {isStarred: true}, 
            icon:<i className="fa-solid fa-star"></i>
        },
        {
            name: 'Sent',
            filterBy: {from: loggedUser.email, to: ''}, 
            icon: <i className="fa-regular fa-paper-plane"></i>
        },
        {
            name: 'Trash',
            filterBy: { removedAt: true },
            icon: <i className="fa-regular fa-trash-can"></i>

        }
    ]

    useEffect(() => {
        clearFilter()
    }, [])

    useEffect(() => {
        setMailCnt(() => mails.filter(mail => !mail.isRead).length)
    }, [mails])

    function onChooseBox(box) {
        clearFilter()
        setChosenBox(box.name)
        setFilterBy(box.filterBy)
    }

    return <section className="mail-menu">
                {mailBoxes.map(box => (
                    <button
                        key={box.name}
                        onClick={() => onChooseBox(box)}
                        className={'category' + (chosenBox === box.name ? ' chosen' : '')}
                    >
                    {box.icon}
                    <span>{box.name}</span>
                    {chosenBox === box.name && <span className="box-count">{mailCnt}</span>}
                    </button>
                ))}
        </section>
}