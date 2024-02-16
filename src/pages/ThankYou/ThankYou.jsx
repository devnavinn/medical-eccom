import { useEffect } from "react"
import { deliveryStep } from "../../constants"
const ThankYou = () => {
    useEffect(() => {
        sessionStorage.clear()
    }, [])
    return (
        <div>
            <h1 className="text-6xl text-center text-[#003780] my-10">ThankYou!</h1>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mt-10'>

                {
                    deliveryStep.map((step, index) => (
                        <div key={index} className="bg-[#EFF6FF] p-5 rounded-lg">
                            <div className="flex justify-center items-center">
                                <img src={step.icon} alt="icon" />
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