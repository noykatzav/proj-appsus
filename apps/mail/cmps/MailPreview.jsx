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
	
    return <tr key={mail.id} className={className} onClick={() => onSetMailRead(mail)}>
        <td>{mail.isStarred}</td>
        <td>{mail.from}</td>
        <td>{mail.subject}</td>
        <td>{mail.sentAt && formatDate(mail.sentAt)}</td>
    </tr>
}
