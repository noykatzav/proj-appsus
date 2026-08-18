const { useState } = React
const { useNavigate } = ReactRouterDOM

import { Modal } from '../cmps/Modal.jsx'

export function MailEdit({ onCloseCompose, isComposeShown,  getEmptyMail, save }) {
    const [ mail, setMail ] = useState(getEmptyMail())

    const navigate = useNavigate()

    //(subject, body, isRead = true, sentAt = utilService.getCurrentTimestamp(), from, to, createdAt) 

    function onSendMail() {
        save(mail)
            .then(mail => {
                showSuccessMsg(`mail ${mail.id} sent`)
                navigate('/mail')
            })
    }

    return <Modal 
            isShown={isComposeShown} 
            onClose={onCloseCompose}
            className="compose modal" >

                <h2>Are you sure?</h2>
        </Modal>

    
}