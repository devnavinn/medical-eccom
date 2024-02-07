import ProductCard from "../../components/ProductCard"
const Home = () => {
    return (
        <>
            <div className="py-5">
                <h1 className="text-2xl text-[#003780]">Choose your products</h1>
                <p className="text-sm pt-2">Fill your box according to your needs or choose one of our most popular combinations. If you wish, you can easily change your products every month.</p>
            </div>

            <div className="grid grid-cols-2 gap-5">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
        </>

    )
}

export default Home