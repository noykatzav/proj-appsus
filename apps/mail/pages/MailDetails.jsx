const { useState, useEffect } = React
const { useParams } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { MailDetActions } from '../cmps/MailDetActions.jsx'
import { MailDetHeader } from '../cmps/MailDetHeader.jsx'
import { MailDetBody } from '../cmps/MailDetBody.jsx'
import { MailDetFooter } from '../cmps/MailDetFooter.jsx'


export function MailDetails({ onSetMailUnread, onRemoveMail }) {
    const [ mail, setMail ] = useState(null)
	const params = useParams()

    useEffect(() => {
        mailService.get(params.id)
            .then(setMail)
    }, [params.id])

    
    function onSetMailUnread(mail) {
        if (!mail.isRead) return 
        const mailId = mail.id        

        return mailService.save({...mail, isRead: false})
    }
    
    function onRemoveMail(mailId) {
        return mailService.remove(mailId)
    }
            
    
    if (!mail) return <section className="mail-details">
            <div className="loader">
                <img src="../../../assets/imgs/loader.svg" alt="A loader." />
            </div>
        </section>


    return <div className="mail-details-container">
        <div className="mail-details">
            <MailDetActions
                mail={mail}
                onSetMailUnread={onSetMailUnread}
                onRemoveMail={onRemoveMail}
            />

            <MailDetHeader mail={mail} />
            
            <MailDetBody mail={mail} />

            <MailDetFooter mail={mail} />
        </div>
    </div>
}