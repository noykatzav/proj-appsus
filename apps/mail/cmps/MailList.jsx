const { Link, useSearchParams } = ReactRouterDOM

import { MailPreview } from 'MailPreview.jsx'

export function MailList({ mails, onSetMailRead}) {
    return <section className="mail-list">
                <ul>
                    {mails.map(mail => (<li key={mail.id}>
                        <Link to={`/mail/${mail.id}`}>
                            <MailPreview mail={mail} onSetMailRead={onSetMailRead} />
                        </Link>
                    </li>))}
                </ul>
        </section>
}
