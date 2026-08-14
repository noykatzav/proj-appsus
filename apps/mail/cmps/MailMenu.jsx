
const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function MailMenu({ mails }) {
    const [mailCnt, setMailCnt] = useState(0)
    
    useEffect(() => {
        setMailCnt(() => mails.filter(mail => mail.isRead).length)
    }, [mails])


    return <section className="mail-menu">
            <div className="category chosen">
                <Link to="/mail">
                    <i className="fa-solid fa-inbox"></i>
                    <span>Inbox (<span>{mailCnt}</span>)</span>
                </Link>
            </div>
        </section>
}