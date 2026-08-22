
const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function MailMenu({ mails, loggedUser, setFilterBy, clearFilter }) {
    const [mailCnt, setMailCnt] = useState(0)
    const [chosenBox, setChosenBox] = useState('Inbox')

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
            filterBy: {from: loggedUser.email}, 
            icon: <i className="fa-regular fa-paper-plane"></i>
        },
        {
            name: 'Trash',
            filterBy: { removedAt: !undefined },
            icon: <i className="fa-regular fa-trash-can"></i>

        }
    ]
    
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
                    {chosenBox === box.name && <span>{mailCnt}</span>}
                    </button>
                ))}
        </section>
}