const { useState } = React
const { useNavigate } = ReactRouterDOM


import { utilService } from '../../../services/util.service.js'
import { Modal } from '../cmps/Modal.jsx'

export function MailEdit({ loggedUser, isComposeShown, onCloseCompose, getEmptyMail, save, showSuccessMsg, setMails }) {
    const [ mail, setMail ] = useState(getEmptyMail())

    const navigate = useNavigate()

    //(subject, body, isRead = true, sentAt = utilService.getCurrentTimestamp(), from, to, createdAt) 

    function onSendMail(ev) {
        ev.preventDefault()

        const formData = new FormData(ev.currentTarget)
        const { to, subject, body } = Object.fromEntries(formData)

        if (!to || !subject) return 

        const isRead = true
        const from = loggedUser.email
        const sentAt = utilService.getCurrentTimestamp()

        const updatedMail = {
            ...mail,
            subject,
            body,
            isRead,
            sentAt,
            from,
            to
        }
        setMail(updatedMail)

        save(updatedMail)
            .then(mail => {
                setMails(prev => [mail, ...prev])
                showSuccessMsg(`mail ${mail.id} sent`)
                onCloseCompose()
            })
    }

    return <Modal 
            isShown={isComposeShown} 
            onClose={onCloseCompose}
            className="mail-edit modal" >

            <form onSubmit={onSendMail}>
                <input name="to" placeholder="To" />
                <input name="subject" placeholder="Subject" />
                <textarea name="body" placeholder="Write your message..."></textarea>

                <button type="submit">Send</button>
            </form>        
        </Modal>
}