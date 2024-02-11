// Layout.js
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Cart from './Cart';
import Navbar from './layout/Navbar';
import ProgressStep from './ProgressStep';
import StepHeading from './StepHeading';
const Layout = ({ children }) => {
    const location = useLocation();
    let { pathname } = location;
    return (
        <div>
            <Navbar />
            <ProgressStep />
            <StepHeading />
            {/* Main content */}
            <section className=' flex flex-row space-x-5'>
                <div className={`${pathname == '/thank-you' ? 'w-full' : 'w-1/2'}`}>
                    {children}
                </div>
                <div className={`flex-1 ${pathname == '/thank-you' ? 'hidden' : 'block'}`}>
                    <Cart />
                </div>
            </section >
        </div >
    );
}

// Prop types validation
Layout.propTypes = {
    children: PropTypes.node.isRequired
};

export default Layout;
