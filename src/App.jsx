import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import {
  AddProduct,
  AdminLogin,
  UpdateProduct,
} from "./routes/AdminRoutes.js";

import {
  UserDashboard,
  LoginPage,
  RegisterPage,
} from './routes/UserRoutes.js'

const ProtectedAdminRoute = ({ element }) => {
  const isAdmin = () => {
    const role = localStorage.getItem('role')
    if (role === "admin") {
      return true;
    }
  };
  return isAdmin() ? element : (<AdminLogin />);
};

const ProtectedUserRoute = ({ element }) => {
  const isUser = () => {
    const token = localStorage.getItem('token')
    if (token) return true;
  };
  return isUser() ? element : (<LoginPage />);
};

function App() {
  return (
    <>
      <Routes>

        {/* ******** Admin Routes start here ********* */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/addProduct"
          element={<ProtectedAdminRoute element={<AddProduct />} />}
        />

        <Route
          path="/admin/updateProduct/:id"
          element={<ProtectedAdminRoute element={<UpdateProduct />} />}
        />

        {/* ******** Admin Routes End here ********* */}



        <Route path="/" element={<LoginPage />} />




        {/* ********* User Dashboard panel routes start from here ********* */}

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/dashboard' element={<ProtectedUserRoute element={<UserDashboard />} />} />

      </Routes>

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
