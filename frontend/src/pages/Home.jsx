import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          backgroundImage: 'url("/images/hero-palestine.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          padding: '120px 0',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold' ,color: '#d4af37',}}> 
            مرحبًا بك في <span style={{ color: '#d4af37' }}>مضافة</span>
          </h1>
          <p className="lead mt-3">
            منصة الحجز الأفضل للقاعات والمناسبات بأسلوب فلسطيني فاخر
          </p>
          <Link to="/halls" className="btn btn-lg mt-4" style={{ backgroundColor: '#13653f', color: '#fff' }}>
            استكشف القاعات
          </Link>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-5 text-center bg-light">
        <div className="container">
          <h2>من نحن</h2>
          <p className="lead">
            مضافة منصة فلسطينية تهدف لتسهيل عملية حجز القاعات والاحتفال بالمناسبات بطريقة ذكية وسلسة.
          </p>
          <Link to="/about-us" className="btn btn-outline-dark mt-3">
            اعرف أكثر
          </Link>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-5 text-center" style={{ backgroundColor: '#13653f', color: '#fff' }}>
        <div className="container">
          <h2>هل تملك قاعة؟</h2>
          <p>انضم إلينا الآن وابدأ باستقبال الحجوزات بكل سهولة.</p>
          <Link to="/dashboard" className="btn btn-light mt-3">
            لوحة التحكم
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
