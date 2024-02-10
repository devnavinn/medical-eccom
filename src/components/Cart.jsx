import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import ProductTab from "./ProductTab"
import { useCart } from "../context/CartContext"
import { v4 as uuidv4 } from 'uuid'
import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { Button } from "./ui/button"
const Cart = () => {
    const location = useLocation()
    const { pathname } = location
    const { cart, removeFromCart, setSliderValue, sliderValue } = useCart();
    useEffect(() => {
        let total = 0;
        cart?.map(item => {
            total += item.price;
        })
        setSliderValue(total);
    }, [cart]);
    console.log('sliderValue', sliderValue);
    return (
        <div className="flex flex-col space-y-2">
            <ProductTab />
            <div className="flex flex-col space-y-5">
                <div className="flex justify-between">
                    <h1 className="text-2xl text-[#1A253B] font-bold">Your Curabox</h1>
                    <p className="text-xl text-[#1A253B] font-bold"> 40€</p>
                </div>
                <Slider defaultValue={[0]} value={[sliderValue]} max={40} step={4} disabled />
            </div>
            {
                cart?.map((item, index) => (
                    <div key={uuidv4()} className="flex justify-between items-center  border-[#003780] py-2 rounded-lg shadow-lg">
                        <div className="flex items-center">
                            <div>
                                <img src={item.image} alt={item.product_name} className="w-20 h-20 object-cover" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold">{item.product_name}</h1>
                                <p>{item.package_size} {item.unit}</p>
                            </div>
                        </div>
                        <div>
                            <button onClick={() => removeFromCart(index)} className="w-10 h-10 flex justify-center items-center rounded-full bg-[#003780] cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                </svg>

                            </button>
                        </div>
                    </div>
                ))
            }
            {
                pathname == '/' && (
                    <Link to={'/contact-details'}>
                        <Button className={cn('w-full flex justify-center rounded-lg bg-[#003780] text-white', cart?.length == 0 && 'hidden')} variant={'primary'}>
                            Continue to your contact details
                        </Button>
                    </Link>
                )
            }
        </div>
    )
}

export default Cart