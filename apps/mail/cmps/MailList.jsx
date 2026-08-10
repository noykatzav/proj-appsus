import { MailPreview } from 'MailPreview.jsx'


export function MailList({ mails, onSetMailRead}) {
    return <table>
        <tbody className="mail-list">
                {mails.map(mail => (<MailPreview key={mail.id} mail={mail} onSetMailRead={onSetMailRead} />))}
        </tbody>
    </table>
}
