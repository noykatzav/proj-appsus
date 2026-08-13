const { useState, useEffect } = React
const { Link, useParams } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { utilService } from '../../../services/util.service.js'
import { MailIndex } from './MailIndex.jsx'


export function MailDetails() {
    const [ mail, setMail ] = useState(null)
	const params = useParams()

    useEffect(() => {
        mailService.get(params.id)
            .then(setMail)
    }, [params.id])

    function formatDetailsDate(timestamp) {
        const isToday = utilService.isToday(timestamp)

        return isToday
            ? utilService.getUsFormatTime(timestamp)
            : utilService.getFullDateTime(timestamp)
    }

    if (!mail) return <section className="mail-details">
            <div className="loader">
                <img src="../../../assets/imgs/loader.svg" alt="A loader." />
            </div>
        </section>


    return <div className="mail-details">
        <section className="actions">
            <button>Delete</button>
        </section>

        <header> 
            <h1>{mail.subject}</h1>
            <p>{`<${mail.from}>`}</p>
            <p>{mail.to}</p>
            <p>{mail.isStarred}</p>
            <p>{mail.sentAt && formatDetailsDate(mail.sentAt)}</p>
        </header>

        <main className="body">
            <p>{mail.body}</p>
        </main>
        
        <nav>
            <Link to={`/mail/${mail.prevMailId}`}><button>Prev</button></Link>
            <Link to={`/mail/${mail.nextMailId}`}><button>Next</button></Link>
            <Link to="/mail"><button>Back</button></Link>
        </nav>
    </div>
}

// const mail = {
//     id: 'e101',
//     createdAt : 1551133930500,
//     subject: 'Miss you!',
//     body: 'Would love to catch up sometimes',
//     isRead: false,
//     isStarred: false,
//     sentAt : 1551133930594,
//     removedAt : null,
//     from: 'momo@momo.com',
//     to: 'user@appsus.com'
// }