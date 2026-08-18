const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { MailDetActions } from '../cmps/MailDetActions.jsx'
import { MailDetHeader } from '../cmps/MailDetHeader.jsx'
import { MailDetBody } from '../cmps/MailDetBody.jsx'
import { MailDetFooter } from '../cmps/MailDetFooter.jsx'


export function MailDetails({ onSetMailUnread, onRemoveMail }) {
    const [ mail, setMail ] = useState(null)
	const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        mailService.get(params.id)
            .then(setMail)
    }, [params.id])

    
    function onSetMailUnread(mail) {
        if (!mail.isRead) return 
        const mailId = mail.id        

        mailService.save({...mail, isRead: false})
            .then(() => navigate('/mail'))
    }
    
    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => navigate('/mail'))
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