import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";

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
import "./index.css";
import { useAuth } from "./contexts/AuthContext";
import Signup from "./pages/Signup";
import Spinner from "./components/Spinner";

function App() {
  let { user, isLoading } = useAuth();
  console.log(user);
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="app" element={!user ? <Login /> : <AppLayout />}>
          <Route index element={<Navigate replace to="cities" />} />
          <Route path="cities" element={<CityList />} />

          <Route path="cities/:id" element={<City />} />
          <Route path="countries" element={<CountryList />} />
          <Route path="form" element={<Form />} />
        </Route>
        <Route
          path="login"
          element={user ? <Navigate replace to="/app" /> : <Login />}
        />
        <Route
          path="signup"
          element={user ? <Navigate replace to="/app" /> : <Signup />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
