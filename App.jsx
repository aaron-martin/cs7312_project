import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import OverviewScreen from "./src/screen/OverviewScreen.jsx";
import MeetingForm from "./src/screen/MeetingForm.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/">Overview</Link>{" "}
                <Link to="/meeting">Add Meeting</Link>
            </nav>
            <Routes>
                <Route path="/" element={<OverviewScreen />} />
                <Route path="/meeting" element={<MeetingForm />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;