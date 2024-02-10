import ProductTab from "./ProductTab"
import { useCart } from "../context/CartContext"
import { v4 as uuidv4 } from 'uuid'
const Cart = () => {
    const { cart, removeFromCart } = useCart();
    console.log('cart', cart);
    return (
        <div className="flex flex-col space-y-2">
            <ProductTab />

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
        </div>
    )
}

export default Cart