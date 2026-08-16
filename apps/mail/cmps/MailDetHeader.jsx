
import { utilService } from '../../../services/util.service.js'


export function MailDetHeader({ mail }) { 

    function formatDetailsDate(timestamp) {
        const isToday = utilService.isToday(timestamp)

        return isToday
            ? utilService.getUsFormatTime(timestamp)
            : utilService.getFullDateTime(timestamp)
    }

    var starClassName = 'fa-solid fa-star'
    if (mail.isStarred) starClassName = "fa-regular fa-star"
    
    return <header className="mail-det-header"> 
            <h1 className="title">{mail.subject}</h1>
            <span className="from">{`<${mail.from}>`}</span>
            <span className="time">{mail.sentAt && formatDetailsDate(mail.sentAt)}</span>
            <button><i className={starClassName}></i></button>
            <span className="to">{mail.to}</span>
        </header>
}