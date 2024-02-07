import { useState } from 'react'
import { Button } from "./ui/button"
import { useLocation } from 'react-router-dom'
const ProductTab = () => {
    const location = useLocation()
    const { pathname } = location
    const [seletedTab, setSelectedTab] = useState(1)

    return (
        <div className={`${pathname == '/' ? 'block' : 'hidden'}`}>
            <h2 className="text-2xl text-[#003780] font-semibold">The most popular compilations</h2>
            <div className="w-full flex flex-row space-x-10 mt-5">
                <Button
                    className={seletedTab === 1 ? 'bg-[#003780] hover:bg-[#003780] text-white hover:text-white' : ''}
                    onClick={() => setSelectedTab(1)} variant={'outline'}>Disinfection</Button>
                <Button
                    className={seletedTab === 2 ? 'bg-[#003780] hover:bg-[#003780] text-white hover:text-white' : ''}
                    onClick={() => setSelectedTab(2)} variant={'outline'}>Hygiene</Button>
                <Button
                    className={seletedTab === 3 ? 'bg-[#003780] hover:bg-[#003780] text-white hover:text-white' : ''}
                    onClick={() => setSelectedTab(3)} variant={'outline'}>Incontinence + protection
                </Button>
            </div>
        </div>
    )
}

export default ProductTab