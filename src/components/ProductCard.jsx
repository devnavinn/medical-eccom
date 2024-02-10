import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useCart } from "../context/CartContext";
import AddToCart from "./AddToCart"
const ProductCard = ({ data }) => {
    const { sliderValue } = useCart();
    const { _id, image, product_name, package_size, unit, isPG51, isGlove } = data;

    const isSliderValueApproximately40 = () => {
        const desiredValue = 40;
        const tolerance = 2; // Define your tolerance level

        return Math.abs(sliderValue - desiredValue) <= tolerance;
    };
    return (
        <Card className={`flex flex-col justify-between ${isSliderValueApproximately40() ? 'opacity-50 pointer-events-none' : ''}`}>
            <CardHeader>
                <div className="w-full h-40 flex justify-center items-center">
                    <img src={image} alt="Product" />
                </div>
                <CardTitle className='text-center'>{product_name}</CardTitle>
                <CardDescription className='text-center'>{package_size} {unit}</CardDescription>
            </CardHeader>

            <CardFooter className={`flex justify-center items-center `}>
                <AddToCart
                    product={data}
                />
            </CardFooter>
        </Card >

    )
}

export default ProductCard