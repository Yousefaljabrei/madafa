import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getBookingsByUser } from '../../api/api';

const UserDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;

      try {
        const res = await getBookingsByUser(user.id);
        console.log('User bookings API response:', res.data);

        if (Array.isArray(res.data)) {
          setBookings(res.data);
        } else {
          setBookings([]);
          setError('لم يتم العثور على حجوزات.');
        }
      } catch (err) {
        console.error('Fetch bookings error:', err);
        setBookings([]);
        setError('حدث خطأ أثناء تحميل الحجوزات');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  if (loading) return <div>جاري تحميل الحجوزات...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <h3>حجوزاتي</h3>
      <ul className="list-group mt-4">
        {bookings.length > 0 ? (
          bookings.map(b => (
            <li key={b.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>القاعة:</strong> {b.hall_title} <br />
                <strong>التاريخ:</strong> {b.date} <br />
                <strong>الوقت:</strong> {b.time_slot}
              </div>
              <span className={`badge ${b.status === 'approved' ? 'bg-success' : 'bg-warning'} text-light`}>
                {b.status === 'approved' ? 'مقبول' : 'معلق'}
              </span>
            </li>
          ))
        ) : (
          <div>لا توجد حجوزات مسجلة</div>
        )}
      </ul>
    </div>
  );
};

export default UserDashboard;
