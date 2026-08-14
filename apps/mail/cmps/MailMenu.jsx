
const { useState, useEffect } = React

export function MailMenu({ mails }) {
    const [mailCnt, setMailCnt] = useState(0)
    
    useEffect(() => {
        setMailCnt(() => mails.filter(mail => mail.isRead).length)
    }, [mails])


    return <section className="mail-menu">
        <div className="category">
            <i className="fa-solid fa-inbox"></i>
            <span>Inbox (<span>{mailCnt}</span>)</span>
        </div>
    </section>
}