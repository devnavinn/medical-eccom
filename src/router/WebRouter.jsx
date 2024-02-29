import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostAddress from "../pages/PostAddress/PostAddress";

const Home = React.lazy(() => import("../pages/Home/Home"))
const ContactDetails = React.lazy(() => import("../pages/ContactDetails/ContactDetails"))
const Countinue = React.lazy(() => import("../pages/Continue/Continue"))
const YourDetails = React.lazy(() => import("../pages/YourDetails/YourDetails"))
const CaregiverDetails = React.lazy(() => import("../pages/CaregiverDetails/CaregiverDetails"))
const DeliveryOptions = React.lazy(() => import("../pages/DeliveryOptions/DeliveryOptions"))
const CompleteApplication = React.lazy(() => import("../pages/CompleteApplication/CompleteApplication"))
const Signature = React.lazy(() => import("../pages/Signature/Signature"))
const ThankYou = React.lazy(() => import("../pages/ThankYou/ThankYou"))
const Layout = React.lazy(() => import("../components/Layout"))
const WebRouter = () => {
    return (
        <Router>
            <Suspense
                fallback={
                    <div className="loading">
                        <div className="loading__content">
                            <div className="loading__content__loader"></div>
                        </div>
                    </div>
                }
            >
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/contact-details" element={<ContactDetails />} />
                        <Route path="/continue" element={<Countinue />} />
                        <Route ptth='/post-address' element={<PostAddress />} />
                        <Route path="/your-details" element={<YourDetails />} />
                        <Route path="/caregiver-details" element={<CaregiverDetails />} />
                        <Route path="/delivery-options" element={<DeliveryOptions />} />
                        <Route path="/complete-application" element={<CompleteApplication />} />
                        <Route path="/signature" element={<Signature />} />
                        <Route path="*" element={<h1>Not Found</h1>} />
                        <Route path="/thank-you" element={<ThankYou />} />
                    </Routes>
                </Layout>

            </Suspense>
        </Router>
    );
};

export default WebRouter;