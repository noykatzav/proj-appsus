
import { mailService } from '../services/mail.service.js'


export function MailDetails() {

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