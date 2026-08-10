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

    return <section className="mail-container">
        <MailHeader />
        <MailFilter />
        <MailMenu />

        <MailList
            mails={mails} />
        
    </section>
}

