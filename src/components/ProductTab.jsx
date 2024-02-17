import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { Button } from "./ui/button"
import { getCompliance, getSingleCompliance } from '../api/api'
import { useCart } from '../context/CartContext'
import { useTranslation } from 'react-i18next'
const ProductTab = () => {
    const { t } = useTranslation()
    const { title, label, button } = t('cart')
    const location = useLocation()
    const { setCartValue, seletedTab, setSelectedTab } = useCart()
    const { pathname } = location
    const [compliance, setCompliance] = useState([])
    useEffect(() => {
        getCompliance().then(data => { setCompliance(data) })
    }, [])
    useEffect(() => {
        if (seletedTab) {
            getSingleCompliance(seletedTab).then(data => {
                setCartValue(data)
            })
        }
    }, [seletedTab])
    return (
        <div className={`${pathname == '/' ? 'block' : 'hidden'}`}>
            <h2 className="text-2xl text-[#003780] font-semibold">{title}</h2>
            <div className="w-full flex flex-row space-x-2 sm:space-x-5 md:space-x-10 mt-5 overflow-x-scroll no-scrollbar">

                {
                    compliance?.map((item, index) => (
                        <Button
                            key={uuidv4()}
                            className={seletedTab == item._id ? 'bg-[#003780] hover:bg-[#003780] text-white hover:text-white' : ''}
                            onClick={() => setSelectedTab(item._id)} variant={'outline'}>{item.compilation_name}
                        </Button>
                    ))
                }
            </div>
        </div>
    )
}

export default ProductTab