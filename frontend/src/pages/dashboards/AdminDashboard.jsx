import { useEffect, useState } from 'react';
import { getAllUsers, getAllHalls, getAllBookings  } from '../../api/api';
import '../../style/AdminDashboard.css'; // أنشئ هذا الملف للتصميم

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [halls, setHalls] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('users');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [usersRes, hallsRes, bookingsRes] = await Promise.all([
          getAllUsers(),
          getAllHalls(),
          getAllBookings()
        ]);

        // ✅ تأكد من أن البيانات عبارة عن Array
        setUsers(Array.isArray(usersRes.data) ? usersRes.data : usersRes.data.data || []);
        setHalls(Array.isArray(hallsRes.data) ? hallsRes.data : hallsRes.data.data || []);
        setBookings(Array.isArray(bookingsRes.data) ? bookingsRes.data : bookingsRes.data.data || []);
      } catch (err) {
        console.error('⚠️ Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const renderTable = () => {
    switch (activeTab) {
      case 'users':
        return (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>الاسم</th>
                <th>البريد</th>
                <th>الدور</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      case 'halls':
        return (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>اسم القاعة</th>
                <th>الموقع</th>
                <th>السعر</th>
              </tr>
            </thead>
            <tbody>
              {halls.map(hall => (
                <tr key={hall.id}>
                  <td>{hall.title}</td>
                  <td>{hall.location}</td>
                  <td>{hall.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      case 'bookings':
        return (
          <table className="table table-hover">
            <thead>
              <tr>
                <th>المستخدم</th>
                <th>القاعة</th>
                <th>التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id}>
                  <td>{b.user_name}</td>
                  <td>{b.hall_title}</td>
                  <td>{b.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      default:
        return <p>لا توجد بيانات.</p>;
    }
  };

  return (
    <div className="admin-dashboard d-flex">
      {/* ✅ الشريط الجانبي */}
      <div className="sidebar bg-dark text-white p-3">
        <h5 className="mb-4">لوحة التحكم</h5>
        <ul className="nav flex-column">
          <li className={`nav-item mb-2 ${activeTab === 'users' ? 'active' : ''}`}>
            <button className="btn btn-link text-white" onClick={() => setActiveTab('users')}>المستخدمين</button>
          </li>
          <li className={`nav-item mb-2 ${activeTab === 'halls' ? 'active' : ''}`}>
            <button className="btn btn-link text-white" onClick={() => setActiveTab('halls')}>القاعات</button>
          </li>
          <li className={`nav-item mb-2 ${activeTab === 'bookings' ? 'active' : ''}`}>
            <button className="btn btn-link text-white" onClick={() => setActiveTab('bookings')}>الحجوزات</button>
          </li>
        </ul>
      </div>

      {/* ✅ المحتوى الرئيسي */}
      <div className="content p-4 w-100">
        <h2 className="mb-4 text-center">لوحة الإدارة</h2>
        {loading ? <p>📡 تحميل البيانات...</p> : renderTable()}
      </div>
    </div>
  );
};

export default AdminDashboard;
