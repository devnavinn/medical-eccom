import { Link, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
const ProgressStep = () => {
    const { t } = useTranslation();
    const { step1, step2, step3, step4, step5 } = t('progress')
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
                <span className="ml-2 text-xs hidden sm:block">{step1}</span>
                {/* </Link> */}

            </div>
            <div className={`flex flex-row items-center `}>
                {/* <Link to={'/contact-details'} className="flex flex-row items-center"> */}
                <div className={`shrink-0 w-10 h-10 rounded-full flex justify-center items-center border border-[#003780] ${getBackgroundColor(2)}`}>2</div>
                <span className="ml-2 text-xs hidden sm:block">{step2}</span>
                {/* </Link> */}

            </div>
            <div className={`flex flex-row justify-center items-center `}>
                {/* <Link to={'/delivery-options'} className="flex flex-row items-center"> */}
                <div className={`shrink-0 w-10 h-10 rounded-full flex justify-center items-center border border-[#003780] ${getBackgroundColor(3)}`}>3</div>
                <span className="ml-2 text-xs hidden sm:block">{step3}</span>
                {/* </Link> */}

            </div>
            <div className={`flex flex-row justify-center items-center `}>
                {/* <Link to={'/complete-application'} className="flex flex-row items-center "> */}

                <div className={`shrink-0 w-10 h-10 rounded-full flex justify-center items-center border border-[#003780] ${getBackgroundColor(4)}`}>4</div>
                <span className="ml-2 text-xs hidden sm:block">{step4}</span>
                {/* </Link> */}
            </div>
            <div className={`flex justify-center items-center `}>
                {/* <Link to="/thank-you" className="flex flex-row items-center"> */}
                <div className={`shrink-0 w-10 h-10 rounded-full flex justify-center items-center border border-[#003780] ${getBackgroundColor(5)}`}>5</div>
                <span className="ml-2 text-xs hidden sm:block">{step5}</span>
                {/* </Link> */}

            </div>
        </div>
    );
};

export default ProgressStep;
