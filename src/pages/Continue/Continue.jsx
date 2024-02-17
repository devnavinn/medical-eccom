import ContinueCard from './../../components/ContinueCard'
import { countinue } from "../../constants"
import { useNavigate } from 'react-router-dom'
import { generatePdf } from '../../api/api'
import { useTranslation } from 'react-i18next'
const Countinue = () => {
    const { t } = useTranslation()
    const { continueCard } = t("specify-data")
    const navigate = useNavigate()


    const getPdf = async () => {
        const sessionId = sessionStorage.getItem('sessionId')
        const res = await generatePdf(sessionId)
        return res.pdfPath
    }
    const handleContinueMethod = (method) => {
        if (method === 'complete-online') {
            navigate('/your-details')
        }
        if (method === 'download-application') {
            getPdf().then(res => {
                const fullPath = `${import.meta.env.VITE_API_BASE_URL}/${res}`
                window.open(fullPath, '_blank');
            })
        }
    }
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-5'>
            {
                continueCard.map((item, index) => (
                    <ContinueCard key={index} data={item}
                        handleContinueMethod={handleContinueMethod}
                    />
                ))
            }
        </div>
    )
}

export default Countinue