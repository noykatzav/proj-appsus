const { Link } = ReactRouterDOM

import { MailPreview } from './MailPreview.jsx'

export function MailList({ mails, onSetMailRead, onSetMailUnread, onRemoveMail, chosenBox }) {
    return <div className="mail-list-container">
        <section className="mail-list">
                    <ul>
                        {mails.map(mail => (<li key={mail.id}>
                            <Link to={`/mail/${mail.id}`}>
                                <MailPreview 
                                    mail={mail} 
                                    onSetMailRead={onSetMailRead} 
                                    onSetMailUnread={onSetMailUnread} 
                                    onRemoveMail={onRemoveMail}
                                    chosenBox={chosenBox}
                                />
                            </Link>
                        </li>))}
                    </ul>
            </section>
        </div>
}
