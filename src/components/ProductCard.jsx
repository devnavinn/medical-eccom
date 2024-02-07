import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import product from './../assets/product.png'
import AddToCart from "./AddToCart"
const ProductCard = () => {
    return (
        <Card>
            <CardHeader>
                <img src={product} alt="Product" />
                <CardTitle>Disposable gloves</CardTitle>
                <CardDescription>100 pieces</CardDescription>
            </CardHeader>

            <CardFooter className='flex justify-center items-center'>
                <AddToCart />
            </CardFooter>
        </Card>

    )
}

export default ProductCard