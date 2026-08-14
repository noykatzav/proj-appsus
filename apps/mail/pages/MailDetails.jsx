const { useState, useEffect } = React
const { Link, useParams } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { MailDetActions } from '../cmps/MailDetActions.jsx'
import { MailDetHeader } from '../cmps/MailDetHeader.jsx'
import { MailDetBody } from '../cmps/MailDetBody.jsx'
import { MailDetFooter } from '../cmps/MailDetFooter.jsx'


export function MailDetails() {
    const [ mail, setMail ] = useState(null)
	const params = useParams()

    useEffect(() => {
        mailService.get(params.id)
            .then(setMail)
    }, [params.id])

    
    if (!mail) return <section className="mail-details">
            <div className="loader">
                <img src="../../../assets/imgs/loader.svg" alt="A loader." />
            </div>
        </section>


    return <div className="mail-details-container">
        <div className="mail-details">
            <MailDetActions />

            <MailDetHeader mail={mail} />
            
            <MailDetBody mail={mail} />

            <MailDetFooter mail={mail} />
        </div>
    </div>
}