import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

import Home from './pages/Home';
import Halls from './pages/Halls';
import HallDetails from './pages/HallDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';

import UserDashboard from './pages/dashboards/UserDashboard';
import OwnerDashboard from './pages/dashboards/OwnerDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import Navbar from './components/Navbar';

const App = () => {
  const { user } = useAuth();

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/halls" element={<Halls />} />
        <Route path="/hall/:id" element={<HallDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />

        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              {user?.role === 'user' && <UserDashboard />}
              {user?.role === 'owner' && <OwnerDashboard />}
              {user?.role === 'admin' && <AdminDashboard />}
            </ProtectedRoute>
          } 
        />

        <Route path="*" element={<div className="text-center mt-5">404 - الصفحة غير موجودة</div>} />
      </Routes>
    </>
  );
};

export default App;
