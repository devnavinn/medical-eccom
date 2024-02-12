import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { Button } from "./ui/button"
import { getCompliance, getSingleCompliance } from '../api/api'
import { useCart } from '../context/CartContext'
const ProductTab = () => {
    const location = useLocation()
    const { setCartValue } = useCart()
    const { pathname } = location
    const [compliance, setCompliance] = useState([])
    const [seletedTab, setSelectedTab] = useState()
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
            <h2 className="text-2xl text-[#003780] font-semibold">The most popular compilations</h2>
            <div className="w-full flex flex-row space-x-10 mt-5">

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