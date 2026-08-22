const { useState } = React
const { useNavigate } = ReactRouterDOM


import { utilService } from '../../../services/util.service.js'
import { Modal } from '../cmps/Modal.jsx'

export function MailEdit({ loggedUser, isComposeShown, onCloseCompose, getEmptyMail, save, showSuccessMsg, loadMails }) {
    const [ mail, setMail ] = useState(getEmptyMail())

    const navigate = useNavigate()

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
                showSuccessMsg(`mail ${mail.id} sent`)
                setMail(getEmptyMail())
                onCloseCompose()
                loadMails()
            })
    }

    return <Modal 
            isShown={isComposeShown} 
            onClose={onCloseCompose}
            className="mail-edit modal" >

            <div className="compose-header">
                <span>New Message</span>
            </div>

            <form onSubmit={onSendMail}>
                <input name="to" placeholder="Recipients" />
                <input name="subject" placeholder="Subject" />
                <textarea name="body" placeholder="Write your message..."></textarea>

                <div className="compose-footer">
                    <button type="submit" className="send-btn">Send</button>
                </div>
            </form>        
        </Modal>
}