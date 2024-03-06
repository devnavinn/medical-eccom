import logo from './../../assets/logo-bottom.svg'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
const Footer = () => {
    const { t } = useTranslation()
    const { copyright } = t("footer")

    return (
        <footer className="w-full bg-primary mt-5">
            <div className=' flex flex-col sm:flex-row justify-between items-center py-2 px-20'>
                <div className="footer__logo-box">
                    <img src={logo} alt="Full logo" className="w-20 h-20" />
                </div>
                <div className='text-center flex flex-col'>
                    <small className='text-white'>{copyright}</small>
                    <small className='text-gray-400 text-xs'>
                        <a href="https://www.jumpstairs.com" target="_blank" rel="noopener noreferrer">Crafted with care by Jumpstairs</a>
                    </small>
                </div>
            </div>
            <div className='flex flex-wrap justify-center space-x-2 text-white text-sm pb-2'>
                <a href="https://www.pflegepaket.org/impressum" target="_blank" rel="noopener noreferrer">Impressum</a>
                <span className="separator">|</span>
                <a href="https://www.pflegepaket.org/kontakt" target="_blank" rel="noopener noreferrer">Kontakt</a>
                <span className="separator">|</span>
                <a href="https://www.pflegepaket.org/datenschutz" target="_blank" rel="noopener noreferrer">Datenschutz</a>
                <span className="separator">|</span>
                <a href="https://www.pflegepaket.org/agb" target="_blank" rel="noopener noreferrer">AGB</a>
                <span className="separator">|</span>
                <a href="https://www.pflegepaket.org/pflichtangaben" target="_blank" rel="noopener noreferrer">Pflichtangaben(HWG & Biozide)</a>
            </div>

        </footer>
    )
}

export default Footer