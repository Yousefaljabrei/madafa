import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { login as loginRequest } from '../api/api'; 
import logo from '../logo1.png'; 
import '../style/Auth.css';


const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginRequest({ email, password });
      if (res.data.status === 'success') {
        login(res.data.user);
        navigate('/dashboard');
      } else {
        alert('خطأ في تسجيل الدخول');
      }
    } catch (err) {
      alert('فشل في الاتصال بالخادم');
      console.error('Login Error:', err);
    }
  };

  return (
    <div className="auth-page" >
      <div className="auth-card">
        <img src={logo} alt="Logo" className="auth-logo" />
        <h2 className="mb-3">تسجيل الدخول</h2>
      <form onSubmit={handleLogin}>
        <input className="form-control mb-3" value={email} onChange={e => setEmail(e.target.value)} placeholder="البريد الإلكتروني" />
        <input className="form-control mb-3" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="كلمة المرور" />
        <button className="btn btn-primary w-100">دخول</button>
      </form>
        <p className="mt-3 text-center">ليس لديك حساب؟ <Link to="/register">إنشاء حساب جديد</Link></p>
    </div>
    </div>
  );
};

export default Login;
