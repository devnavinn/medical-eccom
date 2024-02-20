// Layout.js
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Cart from './Cart';
import Navbar from './layout/Navbar';
import ProgressStep from './ProgressStep';
import StepHeading from './StepHeading';
import Footer from './layout/Footer';
const Layout = ({ children }) => {
    const location = useLocation();
    let { pathname } = location;
    return (
        <div>
            <Navbar />
            <ProgressStep />
            <StepHeading />
            {/* Main content */}
            <section className=' flex flex-col lg:flex-row gap-5 relative'>
                <div className={`${pathname == '/thank-you' ? 'w-full' : 'lg:w-1/2 w-full'} lg:order-1`}>
                    {children}
                </div>
                <div className={`flex-1 ${pathname == '/thank-you' ? 'hidden' : 'block'} order-first lg:order-last h-fit sticky top-0 right-0`}>
                    <Cart />
                </div>
            </section>
            <Footer />
        </div >
    );
}

// Prop types validation
Layout.propTypes = {
    children: PropTypes.node.isRequired
};

export default Layout;
