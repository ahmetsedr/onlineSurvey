import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

import AuthLayout from "./components/AuthLayout";
import MainLayout from "./components/MainLayout";
import ForgotPassword from "./pages/ForgotPassword";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartSurvey from "./pages/StartSurvey";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/StartSurvey" element={<StartSurvey />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/Signin" element={<Signin />} />
            <Route path="/Signup" element={<Signup />} />
          </Route>

          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;