import { useState, useEffect } from "react"
import { getProducts } from "../../api/api"
import ProductCard from "../../components/ProductCard"
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from "react-i18next";
import Spinner from "../../components/Spinner";
const Home = () => {
    const { t } = useTranslation()
    const { title, description } = t("home")
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getProducts().then(data => setProducts(data)).finally(() => setLoading(false))
    }, [])
    return (
        <>
            <div className="py-5">
                <h1 className="text-2xl text-[#003780]">{title}</h1>
                <p className="text-sm pt-2">{description}</p>
            </div>
            {
                loading ? (<div className="w-full h-96 flex justify-center items-center">
                    <Spinner width="w-20" height="h-20" />
                </div>) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 ">
                        {
                            products?.map(item => (
                                <ProductCard key={uuidv4()} data={item} />
                            ))
                        }
                    </div>
                )
            }
        </>

    )
}

export default Home