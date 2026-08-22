const { Link } = ReactRouterDOM

export function Home() {
    return <section className="container home">
        <div className='welcome'>
            <h1>Welcome to AppSus!</h1>
        </div>

        <div className="apps-container">
            <h2>Our Apps</h2>
            <Link to="/mail">
                <div className="mail-app">
                    <img src="assets/imgs/mail_icon.svg.webp" alt="" />
                </div>
            </Link>
            <Link to="/note">
                <div className="note-app">
                    <img src="assets/imgs/Google_Keep_Logo.svg.webp" alt="" />
                </div>
            </Link>
        </div>
    </section>
}