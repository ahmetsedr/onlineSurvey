import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AddSurvey from "./pages/AddSurvey";
import VoteSurvey from "./pages/VoteSurvey";
import NoPage from "./pages/NoPage";
import ForgotPassword from "./pages/ForgotPassword";
import AuthLayout from "./components/AuthLayout";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/AddSurvey" element={<AddSurvey />} />
            <Route path="/VoteSurvey" element={<VoteSurvey />} />
          </Route>
          <Route path="/" element={<AuthLayout />}>
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
          </Route>
          <Route path="*" element={<NoPage />} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App;
