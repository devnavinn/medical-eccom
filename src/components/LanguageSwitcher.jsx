import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className='flex space-x-2 max-md:mt-2'>
            <button className={`text-sm md:text-base border border-1 rounded p-0.5 md:p-1 ${i18n.language === 'en' ? 'bg-blue-400 text-white' : ''}`} onClick={() => changeLanguage('en')}>English</button>
            <button className={`text-sm md:text-base border border-1 rounded p-0.5 md:p-1 ${i18n.language === 'de' ? 'bg-blue-400 text-white' : ''}`} onClick={() => changeLanguage('de')}>German</button>
        </div>
    );
}

export default LanguageSwitcher;
