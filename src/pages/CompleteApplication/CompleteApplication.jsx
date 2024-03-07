import { getOrderDetails } from "../../api/api"
import { useEffect, useState } from "react"
import EditIcon from "../../icons/EditIcon"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
const CompleteApplication = () => {
    const { t } = useTranslation()
    const { completeApplication } = t("specify-data")
    const { heading1, heading2, heading3, span, paragraph, edit, button } = completeApplication
    const [orderDetails, setOrderDetails] = useState([])
    useEffect(() => {
        const sessionId = localStorage.getItem('sessionId')
        const fetchOrderDetails = async () => {
            const res = await getOrderDetails(sessionId)
            if (res.length === 0) return console.log('No data found')
            setOrderDetails(res)
        }
        fetchOrderDetails()
    }, [])
    // Function to check if a value is a valid date
    function isValidDate(dateString) {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(dateString);
    }

    // Function to format a date from yyyy-mm-dd to dd/mm/yyyy
    function formatDate(dateString) {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    }
    return (
        <div className="flex flex-col space-y-5">
            <div className="flex flex-col p-5 rounded-lg shadow-lg">
                <div className="flex justify-between">
                    <h1 className="text-xl sm:text-2xl text-[#003780] ">{heading1}</h1>
                    <Link to={'/your-details'} className="flex flex-row space-x-2">

                        <EditIcon />
                        {edit}
                    </Link>
                </div>

                {
                    Object.entries(orderDetails[0]?.insuredPersonForm || {}).map(([key, value]) => {
                        // Check if the value is in the format 'yyyy-mm-dd'
                        if (key === 'Pflegeperson') return
                        if (isValidDate(value)) {
                            const formattedDate = formatDate(value);
                            return (
                                <div className="grid grid-cols-3 space-y-2" key={key}>
                                    <div className="text-xs sm:text-base">{key.replace(/_/g, ' ')}</div>

                                    <div className="col-span-2 text-xs sm:text-base">{formattedDate}</div>
                                </div>
                            );
                        } else {
                            return (
                                <div className="grid grid-cols-3 space-y-2" key={key}>
                                    <div className="text-xs sm:text-base">{key}</div>
                                    <div className="col-span-2 text-xs sm:text-base">{value}</div>
                                </div>
                            );
                        }
                    })
                }

            </div>
            <div className="flex flex-col p-5 rounded-lg shadow-lg">
                <div className="flex justify-between">
                    <h1 className="text-xl sm:text-2xl text-[#003780] ">{heading2}</h1>
                    <Link to={'/caregiver-details'} className="flex flex-row space-x-2">

                        <EditIcon />
                        {edit}
                    </Link>
                </div>
                {
                    Object.entries(orderDetails[0]?.carePersonForm || {}).map(([key, value]) => {
                        // Check if the value is a date
                        if (isValidDate(value)) {
                            const formattedDate = formatDate(value);
                            return (
                                <div className="grid grid-cols-3 space-y-2" key={key}>
                                    <div className="text-xs sm:text-base">{key}</div>
                                    <div className="col-span-2 text-xs sm:text-base">{formattedDate}</div>
                                </div>
                            );
                        } else {
                            return (
                                <div className="grid grid-cols-3 space-y-2" key={key}>
                                    <div className="text-xs sm:text-base">{key}</div>
                                    <div className="col-span-2 text-xs sm:text-base">{value}</div>
                                </div>
                            );
                        }
                    })
                }
            </div>
            <div>
                <p> <span className="text-[#003780] py-5 md:py-10 lg:py-20">{span}:</span> {paragraph.replace("{{email}}", orderDetails[0]?.insuredPersonForm["E-Mail"])}</p>
            </div>

            <div className="flex flex-col p-5 rounded-lg shadow-lg">
                <div className="flex justify-between">
                    <h1 className="text-xl sm:text-2xl text-[#003780] ">{heading3}</h1>
                    <Link to={'/delivery-options'} className="flex flex-row space-x-2">

                        <EditIcon />
                        {edit}
                    </Link>
                </div>

                {
                    Object.entries(orderDetails[0]?.deliveryOptionsForm || {}).map(([key, value]) => {
                        // Check if the value is a date
                        if (isValidDate(value)) {
                            const formattedDate = formatDate(value);
                            return (
                                <div className="grid grid-cols-3 space-y-2" key={key}>
                                    <div className="text-xs sm:text-base">{key}</div>
                                    <div className="col-span-2 text-xs sm:text-base">{formattedDate}</div>
                                </div>
                            );
                        } else {
                            return (
                                <div className="grid grid-cols-3 space-y-2" key={key}>
                                    <div className="text-xs sm:text-base">{key}</div>
                                    <div className="col-span-2 text-xs sm:text-base">{value}</div>
                                </div>
                            );
                        }
                    })
                }

            </div>

            <Link to={'/signature'} className='w-fit py-2 px-12 md:px-24 rounded-3xl bg-[#003780] text-white'>{button}</Link>
        </div>
    )
}

export default CompleteApplication