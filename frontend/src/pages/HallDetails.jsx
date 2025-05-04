import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getHallById, createBooking } from '../api/api';
import Slider from 'react-slick'; 

const HallDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [hall, setHall] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');

  useEffect(() => {
    const fetchHall = async () => {
      try {
        const res = await getHallById(id);

       
        if (res.data && typeof res.data === 'object') {
        
          res.data.images = Array.isArray(res.data.images)
            ? res.data.images
            : JSON.parse(res.data.images || '[]');

          setHall(res.data);
        } else {
          setError('لم يتم العثور على القاعة.');
        }
      } catch (err) {
        console.error('Error fetching hall:', err);
        setError('حدث خطأ أثناء تحميل القاعة.');
      } finally {
        setLoading(false);
      }
    };

    fetchHall();
  }, [id]);

  const handleBooking = async () => {
    if (!user) {
      alert('يجب تسجيل الدخول للحجز.');
      return;
    }

    try {
      const res = await createBooking({
        user_id: user.id,
        hall_id: id,
        date: date,
        time_slot: timeSlot
      });

      if (res.data.status === 'success') {
        alert('تم الحجز بنجاح!');
      } else {
        alert(res.data.message || 'فشل في الحجز.');
      }
    } catch (err) {
      console.error('Booking error:', err);
      alert('حدث خطأ أثناء محاولة الحجز.');
    }
  };

  if (loading) return <div>جاري تحميل القاعة...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  // إعدادات السلايدر (إذا يوجد أكثر من صورة)
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="container mt-5">
      <h2>{hall.title}</h2>
      <p>{hall.description}</p>
      <p><strong>📍 الموقع:</strong> {hall.location}</p>
      <p><strong>💰 السعر:</strong> {hall.price} </p>

      {/* ✅ عرض الصور */}
      {hall.images && hall.images.length > 0 ? (
        <div className="mb-4">
          {hall.images.length > 1 ? (
            <Slider {...sliderSettings}>
              {hall.images.map((img, index) => (
                <div key={index}>
                  <img
                    src={`/backend/${img}`} 
                    alt={`Hall ${index}`}
                    style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <img
              src={`/backend/${hall.images[0]}`}
              alt={hall.title}
              style={{ width: '100%', height: '300px', objectFit: 'cover' }}
            />
          )}
        </div>
      ) : (
        <div className="alert alert-warning">لا توجد صور متاحة.</div>
      )}

      {/* ✅ نموذج الحجز */}
      <div className="card p-4">
        <h4>حجز القاعة</h4>
        <input
          type="date"
          className="form-control mb-2"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <select
          className="form-select mb-2"
          value={timeSlot}
          onChange={e => setTimeSlot(e.target.value)}
        >
          <option value="">🕓 اختر الوقت</option>
          <option value="morning">الصباح</option>
          <option value="evening">المساء</option>
          <option value="night">الليل</option>
        </select>
        <button className="btn btn-primary w-100" onClick={handleBooking}>
          حجز القاعة
        </button>
      </div>
    </div>
  );
};

export default HallDetails;
