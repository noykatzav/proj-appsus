const { useState, useEffect } = React

import { MailList } from '../cmps/MailList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailMenu } from '../cmps/MailMenu.jsx'
import { MailHeader } from '../cmps/MailHeader.jsx'
import { mailService } from '../services/mail.service.js'


export function MailIndex() {
    const [mails, setMails] = useState([])
    // const [ filterBy, setFilterBy ] = useState(mailService.getDefaultFilter())
    const [filterBy, setFilterBy] = useState({})
    const [sortBy, setsortBy] = useState(mailService.getDefaultSort())

    useEffect(() => {
        loadMails()
    }, [filterBy, sortBy])

    function loadMails() {
        return mailService.query({ filterBy, sortBy })
            .then(setMails)
    }

    function onSetMailRead(mail) {
        return 
        // const mailId = mail.id
        // console.log(mail)

        // const updatedMail = {...mail}
        // updatedMail.isRead = true
        
        // // console.log(updatedMail)

        // mailService.save(updatedMail)
        //     .then(() => setMails(prev => 
        //         prev.map(mail => 
        //             mail.id !== mailId
        //             ? mail.isRead = true
        //             : mail
        // )))
    }

    return <section className="mail-container">
        <MailHeader />
        <MailFilter />
        <MailMenu />

        <MailList
            mails={mails} 
            onSetMailRead={onSetMailRead}
        />
    </section>
}

