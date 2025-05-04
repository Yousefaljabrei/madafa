import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import logo from '../logo1.png'; // عدّل المسار حسب مكان حفظ الصورة


const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const roleBadge = (role) => {
    if (role === 'owner') return <span className="badge bg-warning text-dark ms-2">صاحب قاعة</span>;
    if (role === 'admin') return <span className="badge bg-danger ms-2">مدير</span>;
    return null;
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container-fluid">
        <Link to="/" className="navbar-brand d-flex align-items-center">
  <img src={logo} alt="Logo" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
  <span className="fw-bold fs-5 text-dark">مضافة Madafa</span>
</Link>
          <button className="navbar-toggler" type="button" onClick={toggleSidebar}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/halls">استعراض القاعات</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact-us">تواصل معنا</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about-us">من نحن</Link>
              </li>
              {user && (
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">لوحة التحكم</Link>
                </li>
              )}
            </ul>
            <ul className="navbar-nav">
              {!user ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">تسجيل الدخول</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">إنشاء حساب</Link>
                  </li>
                </>
              ) : (
                <li className="nav-item d-flex align-items-center">
                  <span className="text-dark me-3">
                    {user.name} {roleBadge(user.role)}
                  </span>
                  <button className="btn btn-outline-dark" onClick={handleLogout}>
                    تسجيل الخروج
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* ✅ الشريط الجانبي (Sidebar) */}
      {showSidebar && (
        <div 
          className="position-fixed top-0 start-0 vh-100 bg-dark text-white p-4"
          style={{ width: '250px', zIndex: 1050 }}
        >
          <button className="btn btn-close btn-close-white mb-4" onClick={toggleSidebar}></button>
          <h5>التنقل</h5>
          <ul className="list-unstyled mt-4">
            <li className="mb-3">
              <Link className="text-white" to="/" onClick={toggleSidebar}>الرئيسية</Link>
            </li>
            <li className="mb-3">
              <Link className="text-white" to="/halls" onClick={toggleSidebar}>استعراض القاعات</Link>
            </li>
            {user && (
              <>
                <li className="mb-3">
                  <Link className="text-white" to="/dashboard" onClick={toggleSidebar}>لوحة التحكم</Link>
                </li>
                <li className="mb-3">
                  <button className="btn btn-outline-light w-100" onClick={() => { handleLogout(); toggleSidebar(); }}>
                    تسجيل الخروج
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
