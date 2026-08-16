const { Link } = ReactRouterDOM

export function MailDetFooter({ mail }) { 
    return <footer className="mail-details-footer">
            <nav>
                <Link to={`/mail/${mail.prevMailId}`}><button><i className="fa-solid fa-arrow-left"></i></button></Link>
                <Link to={`/mail/${mail.nextMailId}`}><button><i className="fa-solid fa-arrow-right"></i></button></Link>
            </nav>
    </footer>
}