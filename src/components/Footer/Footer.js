import brandLogo from '../../assets/brand-logo/forecastify-logo.png'
function Footer() {
    return (
        <>
            <hr />
            <div className="footer">
                <div>
                    <img src={brandLogo} alt='brand logo' />
                    <p>© 2024 Forecastify, Inc</p>
                </div>
                <div>
                    <a href='https://www.linkedin.com/in/sametpolat17/' target='_blank' rel='noreferrer'>
                        <i class="fa-brands fa-linkedin fa-xl"></i>
                    </a>
                    <a href='https://www.instagram.com/sametpolat7/' target='_blank' rel='noreferrer'>
                        <i class="fa-brands fa-instagram fa-xl"></i>
                    </a>
                    <a href='https://github.com/sametpolat7' target='_blank' rel='noreferrer'>
                        <i class="fa-brands fa-github fa-xl"></i>
                    </a>
                </div>
            </div>
        </>
    )
}

export default Footer;