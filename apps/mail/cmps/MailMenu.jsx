
const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function MailMenu({ mails, onOpenCompose }) {
    const [mailCnt, setMailCnt] = useState(0)
    
    useEffect(() => {
        setMailCnt(() => mails.filter(mail => mail.isRead).length)
    }, [mails])


    return <section className="mail-menu">
            <button onClick={onOpenCompose}>Compose</button>
            <Link to="/mail">
                <div className="category chosen">
                        <i className="fa-solid fa-inbox"></i>
                        <span>Inbox</span>
                        <span>{mailCnt}</span>
                </div>
            </Link>
        </section>
}