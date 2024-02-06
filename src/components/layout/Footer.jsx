import logo from './../../assets/logo.svg'
const Footer = () => {
    return (
        <footer className="w-full bg-primary">
            <div className=' flex justify-between items-center py-2 px-20'>
                <div className="footer__logo-box">
                    <img src={logo} alt="Full logo" className="w-20 h-20" />
                </div>
                <div>
                    <small className='text-white'>Copyright © 2024 Pelegepaket All rights reserved.</small>
                </div>
            </div>
        </footer>
    )
}

export default Footer