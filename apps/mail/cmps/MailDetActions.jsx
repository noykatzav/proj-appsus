const { Link } = ReactRouterDOM

export function MailDetActions() { 
    return <section className="mail-det-actions">
            <Link to="/mail"><button>{'<'}</button></Link>
            <button><i className="fa-solid fa-trash"></i></button>
        </section>
}