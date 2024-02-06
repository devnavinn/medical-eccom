// Layout.js
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-row">
            {/* Main content */}
            <main>
                {children}
            </main>
            <section>
                {/* Sidebar */}
            </section>

        </div>
    );
}

// Prop types validation
Layout.propTypes = {
    children: PropTypes.node.isRequired
};

export default Layout;
