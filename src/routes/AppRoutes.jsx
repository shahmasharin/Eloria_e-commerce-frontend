import { Routes, Route } from "react-router-dom";

// Layout
import UserLayout from "../components/layout/UserLayout";

// User Pages
import Home from "../pages/user/Home";
import Shop from "../pages/user/Shop";
import ProductDetails from "../pages/user/ProductDetails";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import Cart from "../pages/user/Cart";
import Wishlist from "../pages/user/Wishlist";
import Checkout from "../pages/user/Checkout";
import Orders from "../pages/user/Orders";
import OrderDetails from "../pages/user/OrderDetails";
import OrderSuccess from "../pages/user/OrderSuccess";
import Profile from "../pages/user/Profile";

// Route Guards
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

// Admin Routes
import AdminLogin from "../pages/admin/AdminLogin";
import AdminRoute from "./AdminRoute";
import AdminLayout from "../components/layout/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminOrderDetails from "../pages/admin/AdminOrderDetails";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminProductDetails from "../pages/admin/AdminProductDetails";
import AdminAddProduct from "../pages/admin/AdminAddProduct";
import AdminUsers from "../pages/admin/AdminUsers";

const AppRoutes = () => {
  return (
    <Routes>
      {/* USER LAYOUT*/}

      <Route element={<UserLayout />}>

        {/* PUBLIC PAGES*/}

        <Route path="/" element={<Home />} />

        <Route path="/shop" element={<Shop />} />

        <Route
          path="/product/:slug"
          element={<ProductDetails />}
        />

        {/*  LOGIN / REGISTER*/}

        <Route element={<PublicRoute />}>
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />
        </Route>

        {/* PROTECTED PAGES */}

        <Route element={<ProtectedRoute />}>
          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/wishlist"
            element={<Wishlist />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/orders"
            element={<Orders />}
          />
          <Route
            path="/orders/:id"
            element={<OrderDetails />}
          />

          <Route
            path="/order-success"
            element={<OrderSuccess />}
          />

          <Route path="/profile"
           element={<Profile />}
            />
        </Route>

      </Route>

      {/* admin Authentication  */}

      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin area  */}

      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/orders/:id"  element={<AdminOrderDetails />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/products/new" element={<AdminAddProduct />}/>
          <Route path="/admin/products/:id" element={<AdminProductDetails />}/>
          <Route path="/admin/users" element={<AdminUsers />}/>
        </Route>
      </Route>


    </Routes>
  )
}

export default AppRoutes;