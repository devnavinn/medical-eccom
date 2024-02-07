import { useLocation } from 'react-router-dom';
import { steps } from '../contact';
const StepHeading = () => {
    const location = useLocation();
    let { pathname } = location;
    // Remove the first part of the pathname
    pathname = pathname.substring(pathname.indexOf('/') + 1);

    return (
        <div className={`${pathname == '/' ? 'hidden' : 'block'}`}>
            <h1 className="text-2xl font-bold">{steps[pathname]?.title}</h1>
            <p className="text-sm text-gray-400">{steps[pathname]?.description}</p>
        </div>
    )
}

export default StepHeading