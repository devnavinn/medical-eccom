import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import ProductTab from "./ProductTab"
import { useCart } from "../context/CartContext"
import { v4 as uuidv4 } from 'uuid'
import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { Button } from "./ui/button"
import { useTranslation } from "react-i18next"
const Cart = () => {
    const { t } = useTranslation()
    const { title, label, button } = t('cart')
    const location = useLocation()
    let { pathname } = location
    console.log('pathname', pathname);
    const { cart, removeFromCart, updateCart, setSliderValue, sliderValue, size, updateSize } = useCart();
    useEffect(() => {
        let total = 0;
        cart?.map(item => {
            total += item.price * item.quantity;
        })
        setSliderValue(total);
    }, [cart]);
    const setSize = (size, index) => {
        updateSize(size);
        const newCart = [...cart];
        newCart[index].size = size;
        updateCart(index, newCart[index]);
    }
    console.log('sliderValue', cart, sliderValue);
    return (
        <div className="flex flex-col space-y-2">
            <ProductTab />
            <div className="flex flex-col space-y-5">
                <div className="flex justify-between">
                    <h1 className="text-2xl text-[#1A253B] font-bold">{label}</h1>
                    <p className="text-xl text-[#1A253B] font-bold"> 40€</p>
                </div>
                <Slider defaultValue={[0]} value={[sliderValue]} max={40} step={4} disabled />
            </div>
            {
                cart?.map((item, index) => (
                    <div key={uuidv4()} className="flex justify-between items-center  border-[#003780] py-2 rounded-lg shadow-lg">
                        <div className="flex flex-col">
                            <div className="flex items-center">
                                <div>
                                    <img src={item.image} alt={item.product_name} className="w-16 h-16 object-cover" />
                                </div>
                                <div className="px-4">
                                    <h1 className="text-lg font-bold">{item.product_name}</h1>
                                    <p>{item.package_size} {item.unit}</p>

                                </div>
                            </div>
                            {
                                item.isGlove && (
                                    <div className="flex justify-end space-x-2">
                                        <Button onClick={() => setSize('S', index)} variant={'outline'} className={`w-10 h-10 flex justify-center items-center rounded-lg ${size == 'S' ? 'bg-[#003780] text-white hover:bg-[#003780] hover:text-white' : ''}`}>
                                            S
                                        </Button>
                                        <Button onClick={() => setSize('M', index)} variant={'outline'} className={`w-10 h-10 flex justify-center items-center rounded-lg ${size == 'M' ? 'bg-[#003780] text-white hover:bg-[#003780] hover:text-white' : ''}`}>
                                            M
                                        </Button>
                                        <Button onClick={() => setSize('L', index)} variant={'outline'} className={`w-10 h-10 flex justify-center items-center rounded-lg ${size == 'L' ? 'bg-[#003780] text-white hover:bg-[#003780] hover:text-white' : ''}`}>

                                            L
                                        </Button>
                                        <Button onClick={() => setSize('XL', index)} variant={'outline'} className={`w-10 h-10 flex justify-center items-center rounded-lg ${size == 'XL' ? 'bg-[#003780] text-white hover:bg-[#003780] hover:text-white' : ''}`}>
                                            XL
                                        </Button>
                                    </div>
                                )
                            }
                        </div>
                        <div>
                            <button disabled={pathname !== '/'} onClick={() => removeFromCart(item)} className="w-10 h-10 flex justify-center items-center rounded-full bg-[#003780] cursor-pointer relative">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                </svg>

                                {
                                    item.quantity > 1 ?
                                        <div className="absolute w-6 h-6 flex justify-center items-center rounded-full bg-gray-400 text-white -top-4 -right-2">
                                            {item.quantity}
                                        </div>
                                        : null
                                }
                            </button>
                        </div>
                    </div>
                ))
            }
            {
                pathname == '/' && (
                    <Link to={'/contact-details'}>
                        <Button className={cn('w-full flex justify-center rounded-lg bg-[#003780] text-white', cart?.length == 0 && 'hidden')} variant={'primary'}>
                            {button}
                        </Button>
                    </Link>
                )
            }
        </div>
    )
}

export default Cart