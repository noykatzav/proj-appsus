const { useState, useEffect} = React

import { mailService } from '../services/mail.service.js'


export function MailIndex() {
    const [ mails, setMails ] = useState([])
    // const [ filterBy, setFilterBy ] = useState(mailService.getDefaultFilter())
    const [ filterBy, setFilterBy ] = useState({})

    useEffect(() => {
        loadMails()
    }, [filterBy])

    function loadMails() {
        return mailService.query(filterBy)
            .then(setMails)
    }

    return <section className="container">Mail app
        <pre>{JSON.stringify(mails, null, 2)}</pre>
    </section>
}

