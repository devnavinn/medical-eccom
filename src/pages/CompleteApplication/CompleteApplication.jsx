import { getOrderDetails } from "../../api/api"
import { useEffect, useState } from "react"
import EditIcon from "../../icons/EditIcon"
import { Link } from "react-router-dom"
const CompleteApplication = () => {
    const [orderDetails, setOrderDetails] = useState([])
    useEffect(() => {
        const sessionId = sessionStorage.getItem('sessionId')
        const fetchOrderDetails = async () => {
            const res = await getOrderDetails(sessionId)
            setOrderDetails(res)
        }
        fetchOrderDetails()
    }, [])
    console.log('orderDetails', orderDetails[0]?.insuredPersonForm);
    return (
        <div className="flex flex-col space-y-5">
            <div className="flex flex-col p-5 rounded-lg shadow-lg">
                <div className="flex justify-between">
                    <h1 className="text-2xl text-[#003780] ">Information about the insured person</h1>
                    <Link to={'/your-details'} className="flex flex-row space-x-2">

                        <EditIcon />
                        Edit
                    </Link>
                </div>

                {
                    Object.entries(orderDetails[0]?.insuredPersonForm || {}).map(([key, value]) => (
                        <div className="grid grid-cols-3 space-y-2" key={key}>
                            <div className="">{key}</div>
                            <div className="col-span-2">{value}</div>
                        </div>
                    ))
                }
            </div>
            <div className="flex flex-col p-5 rounded-lg shadow-lg">
                <div className="flex justify-between">
                    <h1 className="text-2xl text-[#003780] ">Caregiver information</h1>
                    <Link to={'/caregiver-details'} className="flex flex-row space-x-2">

                        <EditIcon />
                        Edit
                    </Link>
                </div>

                {
                    Object.entries(orderDetails[0]?.carePersonForm || {}).map(([key, value]) => (
                        <div className="grid grid-cols-3 space-y-2" key={key}>
                            <div className="">{key}</div>
                            <div className="col-span-2">{value}</div>
                        </div>
                    ))
                }
            </div>
            <div>
                <p> <span className="text-[#003780] py-20">Check your data:</span> We use the email address you provided for communication as part of the application process: krishnanandchauhan@kreativemachinez.net Always ensure that this is correct.</p>
            </div>

            <div className="flex flex-col p-5 rounded-lg shadow-lg">
                <div className="flex justify-between">
                    <h1 className="text-2xl text-[#003780] ">Delivery information</h1>
                    <Link to={'/delivery-options'} className="flex flex-row space-x-2">

                        <EditIcon />
                        Edit
                    </Link>
                </div>

                {
                    Object.entries(orderDetails[0]?.deliveryOptionsForm || {}).map(([key, value]) => (
                        <div className="grid grid-cols-3 space-y-2" key={key}>
                            <div className="">{key}</div>
                            <div className="col-span-2">{value}</div>
                        </div>
                    ))
                }
            </div>

            <Link to={'/signature'} className='w-fit py-2 px-24 rounded-3xl bg-[#003780] text-white'>Continue in the application</Link>
        </div>
    )
}

export default CompleteApplication