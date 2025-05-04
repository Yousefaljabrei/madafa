import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';
import logo from '../logo1.png'; // عدّل حسب مسار شعارك
import '../style/Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await api.post('auth/register.php', form);
    if (res.data.status === 'success') {
      alert('تم التسجيل بنجاح');
      navigate('/login');
    } else {
      alert('فشل التسجيل');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <img src={logo} alt="Logo" className="auth-logo" />
        <h2 className="mb-4">إنشاء حساب جديد</h2>
        <form onSubmit={handleRegister}>
          <input
            className="form-control mb-3"
            name="name"
            placeholder="الاسم الكامل"
            onChange={handleChange}
          />
          <input
            className="form-control mb-3"
            name="email"
            placeholder="البريد الإلكتروني"
            type="email"
            onChange={handleChange}
          />
          <input
            className="form-control mb-3"
            name="password"
            type="password"
            placeholder="كلمة المرور"
            onChange={handleChange}
          />
          <select
            name="role"
            className="form-select mb-4"
            onChange={handleChange}
            defaultValue="user"
          >
            <option value="user">مستخدم</option>
            <option value="owner">صاحب قاعة</option>
          </select>
          <button className="btn btn-success w-100">تسجيل</button>
        </form>
        <p className="mt-3">
          لديك حساب؟ <a href="/login">تسجيل الدخول</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
