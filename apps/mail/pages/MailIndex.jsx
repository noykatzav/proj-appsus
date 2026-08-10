const { useState, useEffect } = React

import { MailList } from '../cmps/MailList.jsx'
import { mailService } from '../services/mail.service.js'


export function MailIndex() {
    const [mails, setMails] = useState([])
    // const [ filterBy, setFilterBy ] = useState(mailService.getDefaultFilter())
    const [filterBy, setFilterBy] = useState({})
    const [sortBy, setsortBy] = useState({})

    useEffect(() => {
        loadMails()
    }, [filterBy, sortBy])

    function loadMails() {
        return mailService.query({ filterBy, sortBy })
            .then(setMails)
    }

    return <section className="mail-container">
        <MailList
            mails={mails} />
    </section>
}

