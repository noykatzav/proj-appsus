const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM


import { MailList } from '../cmps/MailList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailMenu } from '../cmps/MailMenu.jsx'
import { MailHeader } from '../cmps/MailHeader.jsx'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { utilService } from '../../../services/util.service.js'
import { mailService } from '../services/mail.service.js'
import { useEffectUpdate } from '../../../custom-hooks/useEffectUpdate.js'



export function MailIndex() {
    const [mails, setMails] = useState([])

    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))
    const [sortBy, setSortBy] = useState(mailService.getSortFromSearchParams(searchParams))


    useEffect(() => {
        loadMails()
    }, [filterBy, sortBy])

    useEffectUpdate(() => {
		loadMails()
		setSearchParams(utilService.trimObj({
            ...filterBy,
            ...sortBy
        }))
	}, [filterBy, sortBy])

    function loadMails() {
        mailService.query({ filterBy, sortBy })
            .then(setMails)
    }

    function onSetMailRead(mail) {
        if (mail.isRead) return 
        const mailId = mail.id        

        mailService.save({...mail, isRead: true})
            .then(() => setMails(prev => 
                prev.map(mail => 
                    mail.id === mailId
                    ? {...mail, isRead: true}
                    : mail
        )))
    }

    function onSetMailUnread(mail) {
        if (!mail.isRead) return 
        const mailId = mail.id        

        mailService.save({...mail, isRead: false})
            .then(() => setMails(prev => 
                prev.map(mail => 
                    mail.id === mailId
                    ? {...mail, isRead: false}
                    : mail
        )))
    }

    function onRemoveMail(mailId) {
		mailService
			.remove(mailId)
			.then(() => {
				setMails(prev => prev.filter(mail => mail.id !== mailId))
				showSuccessMsg(`mail ${mailId} removed`)
			})
			.catch(err => showErrorMsg(`Couldn't remove ${mailId}`))
	}
    

    return <section className="mail-index">
        <MailHeader />
        <MailFilter 
            filterBy={filterBy} 
            sortBy={sortBy} 
            setFilterBy={setFilterBy} 
            setSortBy={setSortBy}
            defaultFilter={mailService.getDefaultFilter()}
            defaultSort={mailService.getDefaultSort()}/>
        <MailMenu mails={mails} />

        <MailList
            mails={mails} 
            onSetMailRead={onSetMailRead}
            onSetMailUnread={onSetMailUnread}
            onRemoveMail={onRemoveMail}
        />
    </section>
}

