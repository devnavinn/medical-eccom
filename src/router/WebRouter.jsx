import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const Home = React.lazy(() => import("../pages/Home/Home"))

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
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<h1>Not Found</h1>} />
                </Routes>
            </Suspense>
        </Router>
    );
};

export default WebRouter;