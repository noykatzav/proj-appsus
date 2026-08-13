import { utilService } from '../../../services/util.service.js'


export function MailPreview({ mail, onSetMailRead }) {
    var className = 'mail'
    if (mail.isRead) className += ' read'

    function formatPreviewDate(timestamp) {
        const isToday = utilService.isToday(timestamp)

        return isToday
            ? utilService.getUsFormatTime(timestamp)
            : utilService.getUsFormatDate(timestamp)
    }
	
    return <div className={className} onClick={() => onSetMailRead(mail)}>
            <p>{mail.isStarred}</p>
            <p>{mail.from}</p>
            <p>{mail.subject}</p>
            <p>{mail.sentAt && formatPreviewDate(mail.sentAt)}</p>
        </div>
}
