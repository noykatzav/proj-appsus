export function MailPreview({ mail, onSetMailRead }) {
    const className = mail.isRead ? 'read' : ''
    
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

	
    return <tr key={mail.id} className={'mail' + ' ' + className} onClick={onSetMailRead(mail)}>
        <td>{mail.isStarred}</td>
        <td>{mail.from}</td>
        <td>{mail.subject}</td>
        <td>{mail.sentAt && formatDate(mail.sentAt)}</td>
    </tr>
}
