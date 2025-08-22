// import { useState, useEffect, Component } from "react";

import { Routes, Route } from 'react-router-dom';
import Credits from './pages/Credits';
import CreditsLogs from './pages/CreditsLogs';
import Licenses from './pages/Licenses';
import LicenseDetail from './pages/LicenseDetail';
import Orders from "./pages/Orders";
import Sellers from "./pages/Sellers";
import Suppliers from "./pages/Suppliers";
import Riders from "./pages/Riders";
import Coupons from "./pages/Coupons";
import CouponEdit from "./pages/CouponEdit";
import Products from "./pages/Products";
import ProductEdit from "./pages/ProductEdit";
import ProductView from "./pages/ProductView";
import Tasks from "./pages/Tasks";
import TaskDetail from "./pages/TaskDetail";
import OrderDetail from "./pages/OrderDetail";
import Subscriptions from "./pages/Subscriptions";
import SubscriptionDetail from "./pages/SubscriptionDetail";
import ApiKeys from "./pages/ApiKeys";
import ApiKeysDetails from "./pages/ApiKeysDetails";
import ValidationRequests from "./pages/ValidationRequests";
import Spammers from "./pages/Spammers";
import SpammersDetail from "./pages/SpammersDetail";
// import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import EditProfile from './pages/EditProfile';
import PrivateRoute from './pages/PrivateRoute';
import AuthProvider from './components/AuthContext';



import './index.css'

function App() {


  // var [userData, setuserData] = useState(null);
  // var [appData, setappData] = useState(window.appData);










  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/app" element={<Dashboard />} />
        <Route
          path="/apikeys"
          element={
            <PrivateRoute>
              <ApiKeys />
            </PrivateRoute>
          }
        />
        <Route
          path="/apikeys/:id"
          element={
            <PrivateRoute>
              <ApiKeysDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/editprofile"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/apirequests"
          element={
            <PrivateRoute>
              <ValidationRequests />
            </PrivateRoute>
          }
        />
        <Route
          path="/spammers"
          element={
            <PrivateRoute>
              <Spammers />
            </PrivateRoute>
          }
        />
        <Route
          path="/credits"
          element={
            <PrivateRoute>
              <Credits />
            </PrivateRoute>
          }
        />
        <Route
          path="/creditslogs"
          element={
            <PrivateRoute>
              <CreditsLogs />
            </PrivateRoute>
          }
        />


        <Route
          path="/licenses"
          element={
            <PrivateRoute>
              <Licenses />
            </PrivateRoute>
          }
        />
        <Route
          path="/licenses/:id"
          element={
            <PrivateRoute>
              <LicenseDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/support"
          element={
            <PrivateRoute>
              <Licenses />
            </PrivateRoute>
          }
        />
        <Route
          path="/support/:id"
          element={
            <PrivateRoute>
              <LicenseDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <PrivateRoute>
              <Licenses />
            </PrivateRoute>
          }
        />
        <Route
          path="/wishlist/:id"
          element={
            <PrivateRoute>
              <LicenseDetail />
            </PrivateRoute>
          }
        />




        <Route
          path="/delivery"
          element={
            <PrivateRoute>
              <Licenses />
            </PrivateRoute>
          }
        />
        <Route
          path="/delivery/:id"
          element={
            <PrivateRoute>
              <LicenseDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <PrivateRoute>
              <Licenses />
            </PrivateRoute>
          }
        />
        <Route
          path="/customers/:id"
          element={
            <PrivateRoute>
              <LicenseDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/refunds"
          element={
            <PrivateRoute>
              <Licenses />
            </PrivateRoute>
          }
        />
        <Route
          path="/refunds/:id"
          element={
            <PrivateRoute>
              <LicenseDetail />
            </PrivateRoute>
          }
        />






        <Route
          path="/spammers/:id"
          element={
            <PrivateRoute>
              <SpammersDetail />
            </PrivateRoute>
          }
        />

        <Route
          path="/sellers"
          element={
            <PrivateRoute>
              <Sellers />
            </PrivateRoute>
          }
        />
        <Route
          path="/suppliers"
          element={
            <PrivateRoute>
              <Suppliers />
            </PrivateRoute>
          }
        />
        <Route
          path="/riders"
          element={
            <PrivateRoute>
              <Riders />
            </PrivateRoute>
          }
        />
        <Route
          path="/coupons"
          element={
            <PrivateRoute>
              <Coupons />
            </PrivateRoute>
          }
        />

        <Route
          path="/product"
          element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <Tasks />
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks/:id"
          element={
            <PrivateRoute>
              <TaskDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders/:id"
          element={
            <PrivateRoute>
              <OrderDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <PrivateRoute>
              <ProductEdit />
            </PrivateRoute>
          }
        />
        <Route
          path="/coupons/:id"
          element={
            <PrivateRoute>
              <CouponEdit />
            </PrivateRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <PrivateRoute>
              <ProductView />
            </PrivateRoute>
          }
        />


        <Route
          path="/subscriptions"
          element={
            <PrivateRoute>
              <Subscriptions />
            </PrivateRoute>
          }
        />
        <Route
          path="/subscriptions/:id"
          element={
            <PrivateRoute>
              <SubscriptionDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
