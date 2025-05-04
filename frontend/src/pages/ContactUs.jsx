import React, { useState } from 'react';
import logo from '../logo1.png'; 
import '../style/Auth.css';
const ContactUs = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('✅ تم إرسال رسالتك بنجاح!');
    setForm({ name: '', email: '', message: '' });
    // يمكن إرسال البيانات لـ backend لاحقًا
  };

  return (
    <div className="auth-page">
      <div className="auth-card text-dark">
        <img src={logo} alt="Madafa Logo" className="auth-logo" />
        <h2 className="mb-4 text-center">📨 تواصل معنا</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="الاسم"
            className="form-control mb-3"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="البريد الإلكتروني"
            className="form-control mb-3"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="رسالتك"
            className="form-control mb-3"
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" className="btn btn-primary w-100">إرسال</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
