import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { DeviceProvider } from "./contexts/DeviceContext";

const App = () => {
  return (
    <AuthProvider>
      <DeviceProvider>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route index element={<HomePage />}></Route>
          </Route>
          <Route path="/login" element={<LoginPage />}></Route>
        </Routes>
      </DeviceProvider>
    </AuthProvider>
  );
};

export default App;
