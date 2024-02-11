import { useLocation } from "react-router-dom";

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
            <div className={`flex flex-row items-center ${getBackgroundColor(1)}`}>
                <div className="w-10 h-10 rounded-full flex justify-center items-center border border-[#003780]">1</div>
                <span className="ml-2 text-xs">Choose Curabox</span>
            </div>
            <div className={`flex flex-row items-center ${getBackgroundColor(2)}`}>
                <div className="w-10 h-10 rounded-full flex justify-center items-center border border-[#003780]">2</div>
                <span className="ml-2 text-xs">Specify Data</span>
            </div>
            <div className={`flex flex-row justify-center items-center ${getBackgroundColor(3)}`}>
                <div className="w-10 h-10 rounded-full flex justify-center items-center border border-[#003780]">3</div>
                <span className="ml-2 text-xs">Define Delivery</span>
            </div>
            <div className={`flex flex-row justify-center items-center ${getBackgroundColor(4)}`}>
                <div className="w-10 h-10 rounded-full flex justify-center items-center border border-[#003780]">4</div>
                <span className="ml-2 text-xs">Complete Application</span>
            </div>
            <div className={`flex justify-center items-center ${getBackgroundColor(5)}`}>
                <div className="w-10 h-10 rounded-full flex justify-center items-center border border-[#003780]">5</div>
                <span className="ml-2 text-xs">Receive Curabox</span>
            </div>
        </div>
    );
};

export default ProgressStep;
