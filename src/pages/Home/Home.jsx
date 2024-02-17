import { useState, useEffect } from "react"
import { getProducts } from "../../api/api"
import ProductCard from "../../components/ProductCard"
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from "react-i18next";
const Home = () => {
    const { t } = useTranslation()
    const { title, description } = t("home")
    const [products, setProducts] = useState([])
    useEffect(() => {
        getProducts().then(data => setProducts(data))
    }, [])
    console.log('products', products);
    return (
        <>
            <div className="py-5">
                <h1 className="text-2xl text-[#003780]">{title}</h1>
                <p className="text-sm pt-2">{description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 ">
                {
                    products?.map(item => (
                        <ProductCard key={uuidv4()} data={item} />
                    ))
                }
            </div>
        </>

    )
}

export default Home