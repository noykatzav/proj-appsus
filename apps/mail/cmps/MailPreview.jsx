export function MailPreview({ mail, onSetMailRead }) {

    function formatDate(timestamp) {
        const date = new Date(timestamp)
        const currentYear = new Date().getFullYear()

        const options = {
            day: '2-digit',
            month: 'short',
            ...(date.getFullYear() !== currentYear && { year: 'numeric' })
        }

        return date.toLocaleDateString('en-GB', options)
    }

    var className = 'mail'
    if (mail.isRead) className += ' read'
	
    return <div className={className} onClick={() => onSetMailRead(mail)}>
            <p>{mail.isStarred}</p>
            <p>{mail.from}</p>
            <p>{mail.subject}</p>
            <p>{mail.sentAt && formatDate(mail.sentAt)}</p>
        </div>
}
