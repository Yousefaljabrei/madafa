import React from 'react';
import logo from '../logo1.png'; 
import '../style/Auth.css';

const AboutUs = () => {
  return (
    <div className="auth-page">
      <div className="auth-card text-center text-dark">
        <img src={logo} alt="Madafa Logo" className="auth-logo" />
        <h2 className="mb-4">من نحن</h2>

        <p className="mb-4 text-center">
          <strong>مضافة | Madafa</strong> هي منصة إلكترونية مبتكرة تهدف إلى تسهيل عمليات استكشاف، حجز، وإدارة القاعات بأنواعها المختلفة — مثل قاعات الأفراح، الاستراحات، وقاعات الاجتماعات. تم تطوير المنصة باستخدام أحدث تقنيات الويب لتقديم تجربة مرنة وسريعة وموثوقة للمستخدمين وأصحاب القاعات على حد سواء.
        </p>

        <h5 className="mb-4 text-center">🎯 الرسالة</h5>
        <p className="mb-4 text-center">
          تقديم حلول تقنية متكاملة تربط أصحاب القاعات بالمستخدمين، وتُمكن الجميع من إدارة المناسبات والحجوزات بكفاءة عالية، مع توفير بيئة موثوقة، سهلة الاستخدام، ومتاحة في أي وقت ومن أي مكان.
        </p>

        <h5 className="mb-4 text-center">💼 قيمنا</h5>
        <ul className="mb-4 text-center list-unstyled">
          <li>الابتكار والتطوير المستمر</li>
          <li>التركيز على تجربة المستخدم</li> 
          <li>الاحترافية في التعامل والتقنية</li>
          <li>الشفافية والموثوقية</li>
          <li>دعم المستخدمين على مدار الساعة</li>
          <li>الابتكار المستمر</li>
        </ul>
      </div>
    </div>
  );
};


export default AboutUs;
