import { utilService } from '../../../services/util.service.js'


export function MailPreview({ mail, onSetMailRead, onRemoveMail}) {
   
    function formatPreviewDate(timestamp) {
        const isToday = utilService.isToday(timestamp)
        
        return isToday
        ? utilService.getUsFormatTime(timestamp)
        : utilService.getUsFormatDate(timestamp)
    }

    var mailClassName = 'mail-preview'
    var starClassName = 'star'
	
    if (mail.isRead) mailClassName += ' read'
    
    if (mail.isStarred) starClassName += " fa-solid fa-star"
    else  starClassName += " fa-regular fa-star"

    return <div className={mailClassName} onClick={() => onSetMailRead(mail)}>
            <button><i className={starClassName}></i></button>
            <span>{mail.from}</span>
            <span>{mail.subject}</span>
            <span className="mail-time">{mail.sentAt && formatPreviewDate(mail.sentAt)}</span>

            <div className="mail-actions">
                <button className="remove" 
                    onClick={(event) => {event.preventDefault()
                                        event.stopPropagation()
                                        onRemoveMail(mail.id)
                                        }}>
                    <i className="fa-solid fa-trash"></i>
                </button>
                <button className="mark-unread"><i className="fa-regular fa-envelope"></i></button>
            </div>
        </div>
}
