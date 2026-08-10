export function MailPreview({ mail }) {
	
    return <tr key={mail.id}>
        <td>{mail.isStarred}</td>
        <td>{mail.from}</td>
        <td>{mail.subject}</td>
        <td>{mail.sentAt}</td>
    </tr>
}
