const { Link , useNavigate} = ReactRouterDOM


export function MailDetActions({ mail, onSetMailUnread, onRemoveMail }) { 

    const navigate = useNavigate()

    return <section className="mail-det-actions">
            <Link to="/mail"><button>{'<'}</button></Link>
            <button onClick={() => {onRemoveMail(mail.id)
                                    .then(() => navigate('/mail'))}}>
                <i className="fa-solid fa-trash"></i>
            </button>
            <button className="mark-unread"
                onClick={() => {onSetMailUnread(mail)
                                .then(() => navigate('/mail'))}}>
                <i className="fa-regular fa-envelope"></i>
            </button>
        </section>
}