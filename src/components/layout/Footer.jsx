import logo from './../../assets/logo-bottom.svg'
import { useTranslation } from 'react-i18next'
const Footer = () => {
    const { t } = useTranslation()
    const { copyright } = t("footer")
    return (
        <footer className="w-full bg-primary mt-5">
            <div className=' flex justify-between items-center py-2 px-20'>
                <div className="footer__logo-box">
                    <img src={logo} alt="Full logo" className="w-20 h-20" />
                </div>
                <div>
                    <small className='text-white'>{copyright}</small>
                </div>
            </div>
        </footer>
    )
}

export default Footer