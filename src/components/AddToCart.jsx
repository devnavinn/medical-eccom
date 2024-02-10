import { useCart } from "../context/CartContext"
const AddToCart = ({ product }) => {
    const { addToCart } = useCart();
    return (
        <div
            onClick={() => addToCart(product)}
            className="w-14 h-14 flex justify-center items-center rounded-full bg-[#003780] cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>

        </div>
    )
}

export default AddToCart