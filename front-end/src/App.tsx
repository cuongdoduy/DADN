import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { DeviceProvider } from "./contexts/DeviceContext";
import ScenarioPage from "./pages/ScenarioPage";
import RulePage from "./pages/RulePage";

const App = () => {
  return (
    <AuthProvider>
      <DeviceProvider>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route index element={<HomePage />}></Route>
            <Route path="/scenarios" element={<ScenarioPage />}></Route>
            <Route path="/rules" element={<RulePage />}></Route>
          </Route>
          <Route path="/login" element={<LoginPage />}></Route>
        </Routes>
      </DeviceProvider>
    </AuthProvider>
  );
};

export default App;
