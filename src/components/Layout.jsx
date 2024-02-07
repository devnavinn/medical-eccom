// Layout.js
import PropTypes from 'prop-types';
import Cart from './Cart';
import Navbar from './layout/Navbar';
import ProgressStep from './ProgressStep';
import StepHeading from './StepHeading';
const Layout = ({ children }) => {
    return (
        <div className="px-20">
            <Navbar />
            <ProgressStep />
            <StepHeading />
            {/* Main content */}
            <section className=' flex flex-row'>
                <div className='w-1/2'>
                    {children}
                </div>
                <div className='flex-1'>
                    <Cart />
                </div>
            </section>


        </div>
    );
}

// Prop types validation
Layout.propTypes = {
    children: PropTypes.node.isRequired
};

export default Layout;
