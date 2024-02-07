const ProgressStep = () => {
    return (
        <div className='grid grid-cols-5 gap-x-10 p-5 rounded-lg shadow mb-5'>
            <div className='flex flex-row items-center'>
                <div className='w-10 h-10 rounded-full flex justify-center items-center border border-[#003780]'>
                    1
                </div>
                <span className='ml-2 text-xs'>Choose Curabox</span>
            </div>
            <div className='flex flex-row items-center'>
                <div className='w-10 h-10 rounded-full flex justify-center items-center border border-[#003780]'>
                    2
                </div>
                <span className='ml-2 text-xs'>Specify Data</span>
            </div>
            <div className='flex flex-row items-center'>
                <div className='w-10 h-10 rounded-full flex justify-center items-center border border-[#003780]'>
                    1
                </div>
                <span className='ml-2 text-xs'>Define Delivery</span>
            </div>
            <div className='flex flex-row items-center'>
                <div className='w-10 h-10 rounded-full flex justify-center items-center border border-[#003780]'>
                    1
                </div>
                <span className='ml-2 text-xs'>Complete Application</span>
            </div>
            <div className='flex flex-row items-center'>
                <div className='w-10 h-10 rounded-full flex justify-center items-center border border-[#003780]'>
                    1
                </div>
                <span className='ml-2 text-xs'>Recieve Curabox</span>
            </div>
        </div>
    )
}

export default ProgressStep