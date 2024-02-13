import { Link, useLocation } from "react-router-dom";

const ProgressStep = () => {
    const location = useLocation();
    const { pathname } = location;

    // Function to determine background color based on path
    const getBackgroundColor = (step) => {
        if (pathname === '/') {
            return step === 1 ? 'bg-[#003787] text-white' : '';
        } else if (
            pathname === '/contact-details' ||
            pathname === '/continue' ||
            pathname === '/caregiver-details' ||
            pathname === '/your-details'
        ) {
            return step <= 2 ? 'bg-[#003787] text-white' : '';
        } else if (pathname === '/delivery-options') {
            return step <= 3 ? 'bg-[#003787] text-white' : '';
        } else if (pathname === '/complete-application' || pathname === '/signature') {
            return step <= 4 ? 'bg-[#003787] text-white' : '';
        } else if (pathname === '/thank-you') {
            return step <= 5 ? 'bg-[#003787] text-white' : '';
        }
        return '';
    };

    return (
        <div className="grid grid-cols-5 gap-x-10 p-5 rounded-lg shadow mb-5">
            <div className={`flex flex-row items-center }`}>
                {/* <Link to={'/'} className="flex flex-row items-center"> */}
                <div className={`shrink-0 w-10 h-10 rounded-full flex justify-center items-center border border-[#003780] ${getBackgroundColor(1)}`}>1</div>
                <span className="ml-2 text-xs hidden sm:block">Choose Curabox</span>
                {/* </Link> */}

            </div>
            <div className={`flex flex-row items-center `}>
                {/* <Link to={'/contact-details'} className="flex flex-row items-center"> */}
                <div className={`shrink-0 w-10 h-10 rounded-full flex justify-center items-center border border-[#003780] ${getBackgroundColor(2)}`}>2</div>
                <span className="ml-2 text-xs hidden sm:block">Specify Data</span>
                {/* </Link> */}

            </div>
            <div className={`flex flex-row justify-center items-center `}>
                {/* <Link to={'/delivery-options'} className="flex flex-row items-center"> */}
                <div className={`shrink-0 w-10 h-10 rounded-full flex justify-center items-center border border-[#003780] ${getBackgroundColor(3)}`}>3</div>
                <span className="ml-2 text-xs hidden sm:block">Define Delivery</span>
                {/* </Link> */}

            </div>
            <div className={`flex flex-row justify-center items-center `}>
                {/* <Link to={'/complete-application'} className="flex flex-row items-center "> */}

                <div className={`shrink-0 w-10 h-10 rounded-full flex justify-center items-center border border-[#003780] ${getBackgroundColor(4)}`}>4</div>
                <span className="ml-2 text-xs hidden sm:block">Complete Application</span>
                {/* </Link> */}
            </div>
            <div className={`flex justify-center items-center `}>
                {/* <Link to="/thank-you" className="flex flex-row items-center"> */}
                <div className={`shrink-0 w-10 h-10 rounded-full flex justify-center items-center border border-[#003780] ${getBackgroundColor(5)}`}>5</div>
                <span className="ml-2 text-xs hidden sm:block">Receive Curabox</span>
                {/* </Link> */}

            </div>
        </div>
    );
};

export default ProgressStep;
