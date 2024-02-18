import ContinueCard from './../../components/ContinueCard'
import { useNavigate, useLocation } from 'react-router-dom'
import { generatePdf, sendMail } from '../../api/api'
import { useTranslation } from 'react-i18next'
import { useToast } from "@/components/ui/use-toast"
import { useEffect } from 'react'
import { getOrderDetails } from '../../api/api'
const Countinue = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const sessionId = queryParams.get('sessionId');
    const { toast } = useToast()
    const { t } = useTranslation()
    const { continueCard } = t("specify-data")
    const navigate = useNavigate()

    useEffect(() => {
        if (sessionId) {
            localStorage.setItem('sessionId', sessionId)
            const fetchOrderDetails = async () => {
                const res = await getOrderDetails(sessionId)
                if (!res) return console.log('No data found')
                console.log('res', res);
                const orderDetails = res[0]
                localStorage.setItem('cart', JSON.stringify(orderDetails?.productsForm?.product_details))
                localStorage.setItem('size', orderDetails?.productsForm?.gloveSize)
                localStorage.setItem('contactDetails', JSON.stringify(orderDetails?.contactForm))
                // localStorage.setItem('orderDetails', JSON.stringify(res))
            }
            fetchOrderDetails()
        }

    }, [sessionId])

    const getPdf = async () => {
        const sessionId = localStorage.getItem('sessionId')
        const res = await generatePdf(sessionId)
        return res.pdfPath
    }
    const handleContinueMethod = async (method) => {
        if (method === 'complete-online') {
            navigate('/your-details')
        }
        if (method === 'download-application') {
            getPdf().then(res => {
                if (res.success) {
                    const fullPath = `${import.meta.env.VITE_API_PDF_URL}/${res.pdfPath}`
                    window.open(fullPath, '_blank');
                }
            })
        }
        if (method === 'continue-later') {
            const sessionId = localStorage.getItem('sessionId')
            const res = await sendMail(sessionId)
            if (res.success) {
                toast({
                    title: 'Mail sent successfully',
                    description: 'Your session details has been sent to your mail',
                })
            }

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