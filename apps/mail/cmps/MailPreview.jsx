import { utilService } from '../../../services/util.service.js'


export function MailPreview({ mail, onSetMailRead }) {
   
    function formatPreviewDate(timestamp) {
        const isToday = utilService.isToday(timestamp)
        
        return isToday
        ? utilService.getUsFormatTime(timestamp)
        : utilService.getUsFormatDate(timestamp)
    }

    var mailClassName = 'mail'
    var starClassName = 'fa-solid fa-star'
	
    if (mail.isRead) mailClassName += ' read'
    if (mail.isStarred) starClassName = "fa-regular fa-star"

    return <div className={mailClassName} onClick={() => onSetMailRead(mail)}>
            <button><i className={starClassName}></i></button>
            <p>{mail.from}</p>
            <p>{mail.subject}</p>
            <p>{mail.sentAt && formatPreviewDate(mail.sentAt)}</p>
        </div>
}
