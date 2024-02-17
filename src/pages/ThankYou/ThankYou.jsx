import { useEffect } from "react"
import first from '../../assets/first.svg'
import second from '../../assets/second.svg'
import third from '../../assets/third.svg'

const icons = {
    first,
    second,
    third
}
import { useTranslation } from "react-i18next"
const ThankYou = () => {
    const { t } = useTranslation()
    const { title, thankYou } = t("thank-you")
    useEffect(() => {
        sessionStorage.clear()
    }, [])
    return (
        <div>
            <h1 className="text-6xl text-center text-[#003780] my-10">{title}!</h1>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mt-10'>

                {
                    thankYou?.map((step, index) => (
                        <div key={index} className="bg-[#EFF6FF] p-5 rounded-lg">
                            <div className="flex justify-center items-center">
                                <img src={icons[step.icon]} alt="icon" />
                            </div>
                            <p className="mt-5">{step.desc}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ThankYou