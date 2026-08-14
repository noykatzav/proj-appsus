const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM


import { MailList } from '../cmps/MailList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailMenu } from '../cmps/MailMenu.jsx'
import { MailHeader } from '../cmps/MailHeader.jsx'
import { utilService } from '../../../services/util.service.js'
import { mailService } from '../services/mail.service.js'
import { useEffectUpdate } from '../../../custom-hooks/useEffectUpdate.js'



export function MailIndex() {
    const [mails, setMails] = useState([])

    const [searchParams, setSearchParams] = useSearchParams()
    // const [ filterBy, setFilterBy ] = useState(mailService.getDefaultFilter())
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))
    const [sortBy, setsortBy] = useState(mailService.getDefaultSort())


    useEffect(() => {
        loadMails()
    }, [filterBy, sortBy])

    useEffectUpdate(() => {
		loadCars(filterBy)
		setSearchParams(utilService.trimObj(filterBy))
	}, [filterBy])

    function loadMails() {
        mailService.query({ filterBy, sortBy })
            .then(setMails)
    }

    function onSetMailRead(mail) {
        if (mail.isRead) return 
        const mailId = mail.id        
        console.log({...mail, isRead: true})

        mailService.save({...mail, isRead: true})
            .then(() => setMails(prev => 
                prev.map(mail => 
                    mail.id === mailId
                    ? {...mail, isRead: true}
                    : mail
        )))
    }

    return <section className="mail-index">
        <MailHeader />
        <MailFilter />
        <MailMenu />

        <MailList
            mails={mails} 
            onSetMailRead={onSetMailRead}
        />
    </section>
}

