const { useState, useEffect } = React
const { Link, useParams } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'


export function MailDetails() {
    const [ mail, setMail ] = useState(null)
	const params = useParams()

    useEffect(() => {
        mailService.get(params.id)
            .then(setMail)
    }, [params.id])

    if (!mail) return <section className="mail-details">
            <div className="loader">
                <img src="../../../assets/imgs/loader.svg" alt="A loader." />
            </div>
        </section>


    return <section className="mail-details">
        <h1>{mail.subject}</h1>
        <p>{mail.body}</p>
        
        <nav>
            <Link to={`/mail/${mail.prevMailId}`}><button>Prev</button></Link>
            <Link to={`/mail/${mail.nextMailId}`}><button>Next</button></Link>
            <Link to="/mail"><button>Back</button></Link>
        </nav>
    </section>
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