const { Link } = ReactRouterDOM


export function MailDetActions({ mail, onSetMailUnread, onRemoveMail }) { 

    return <section className="mail-det-actions">
            <Link to="/mail"><button>{'<'}</button></Link>
            <button onClick={() => {onRemoveMail(mail.id)}}>
                <i className="fa-solid fa-trash"></i>
            </button>
            <button className="mark-unread"
                onClick={() => {onSetMailUnread(mail)}}>
                <i className="fa-regular fa-envelope"></i>
            </button>
        </section>
}