const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM


import { MailList } from '../cmps/MailList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailMenu } from '../cmps/MailMenu.jsx'
import { MailHeader } from '../cmps/MailHeader.jsx'
import { MailEdit } from '../cmps/MailEdit.jsx'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { utilService } from '../../../services/util.service.js'
import { mailService } from '../services/mail.service.js'
import { useEffectUpdate } from '../../../custom-hooks/useEffectUpdate.js'



export function MailIndex() {
    const loggedUser = mailService.getLoggedUser()
    const [mails, setMails] = useState([])
    const [ isComposeShown, setIsComposeShown ] = useState(false)

    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))
    const [sortBy, setSortBy] = useState(mailService.getSortFromSearchParams(searchParams))

    const [chosenBox, setChosenBox] = useState('Inbox')

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

    function clearFilter() {
        setFilterBy(mailService.getDefaultFilter())
        setSortBy(mailService.getDefaultSort())
    }

    function onRemoveMail(mail) {
        const mailId = mail.id

        const updatedMail = {
            ...mail,
            removedAt: utilService.getCurrentTimestamp()
        }

		mailService.save({...mail, removedAt: utilService.getCurrentTimestamp()})
            .then(() => {
				setMails(prev => prev.filter(mail => mail.id !== mailId))
                console.log(updatedMail)
				showSuccessMsg(`mail ${mailId} removed`)
			})
			// .catch(err => showErrorMsg(`Couldn't remove ${mailId}`))
			// .remove(mailId)
			// .then(() => {
			// 	setMails(prev => prev.filter(mail => mail.id !== mailId))
			// 	showSuccessMsg(`mail ${mailId} removed`)
			// })
			// .catch(err => showErrorMsg(`Couldn't remove ${mailId}`))
	}

    function onOpenCompose() {
        console.log('Modal has opened...')
        setIsComposeShown(true)
    }

    function onCloseCompose() {
        console.log('Modal has closed...')
        setIsComposeShown(false)
    }
    

    return <section className="mail-index">
        <MailHeader />
        
        <MailFilter 
            filterBy={filterBy} 
            sortBy={sortBy} 
            setFilterBy={setFilterBy} 
            setSortBy={setSortBy}
            defaultFilter={mailService.getDefaultFilter()}
            defaultSort={mailService.getDefaultSort()}
            clearFilter={clearFilter}
        />
        
        <MailMenu 
            mails={mails} onOpenCompose={onOpenCompose} 
            loggedUser={mailService.getLoggedUser()}
            setFilterBy={setFilterBy} 
            setSortBy={setSortBy}
            clearFilter={clearFilter}
            chosenBox={chosenBox}
            setChosenBox={setChosenBox}
        />
        
        <MailList
            mails={mails} 
            onSetMailRead={onSetMailRead}
            onSetMailUnread={onSetMailUnread}
            onRemoveMail={onRemoveMail}
            chosenBox={chosenBox}
        />
        
        <MailEdit 
            loggedUser={loggedUser}
            onCloseCompose={onCloseCompose}
            isComposeShown={isComposeShown}
            getEmptyMail={mailService.getEmptyMail}
            save={mailService.save} 
            showSuccessMsg={showSuccessMsg}
            setMails={setMails}
        />

    </section>
}

