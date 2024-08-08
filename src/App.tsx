import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import NextPage from "./pages/NextPage";
import InitialPage from "./pages/InitialPage";
import DestinationSelectionPage from "./pages/DestinationSelectionPage";
import RecommendationPage from "./pages/RecommendationPage";
import "./App.css"
import DayPlanPage from "./pages/DayPlanPage";
import LoadingPage from "./pages/LoadingPage";
import TempMap from "./pages/TempMAp";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/next" element={<NextPage />} />
        <Route path="/country" element={<InitialPage />} />
        <Route path="/select-destination" element={<DestinationSelectionPage />} />
        <Route path="/recommendation" element={<RecommendationPage />} />
        <Route path="/day-plan" element={<DayPlanPage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/temp" element={<TempMap />} />
        {/* Define other routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;