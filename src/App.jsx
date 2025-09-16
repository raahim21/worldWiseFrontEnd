import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CountryList from "./components/CountryList";
import Form from "./components/Form";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import City from "./components/City";
import Signup from "./pages/Signup";
import { useAuth } from "./contexts/AuthContext";
import "./index.css";

function App() {
  const { user, isLoading } = useAuth();

  if (import.meta.env.VITE_NODE_ENV !== "production") {
    console.log("User:", user); // Debug only
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route
            path="app"
            element={
              isLoading ? null : user ? (
                <AppLayout />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          >
            <Route index element={<Navigate replace to="cities" />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route
            path="login"
            element={
              isLoading ? null : user ? (
                <Navigate replace to="/app" />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="signup"
            element={
              isLoading ? null : user ? (
                <Navigate replace to="/app" />
              ) : (
                <Signup />
              )
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        style={{ zIndex: 9999 }}
      />
    </>
  );
}

export default App;
