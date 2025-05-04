import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getHallsByOwner, createHall, updateHall, deleteHall, getAllBookings, uploadImage } from '../../api/api';
import '../../style/OwnerDashboard.css'; 

const OwnerDashboard = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('halls');
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editHallId, setEditHallId] = useState(null);

  const [newHall, setNewHall] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    image: null
  });

  const [reservations, setReservations] = useState([]);
  const [, setReservationLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const res = await getHallsByOwner(user.id);
        if (Array.isArray(res.data)) {
          setHalls(res.data);
        }
      } catch (err) {
        console.error('Error loading halls:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const fetchReservations = async () => {
      try {
        const res = await getAllBookings();
        setReservations(res.data);
      } catch (err) {
        console.error('Error loading reservations:', err);
      } finally {
        setReservationLoading(false);
      }
    };

    fetchReservations();
  }, [user]);

  const handleAddOrUpdateHall = async () => {
    try {
      let imagePath = null;

      // Upload image if a new one is selected
      if (newHall.image) {
        const formData = new FormData();
        formData.append('file', newHall.image);
        formData.append('hall_id', editHallId || 'new'); // Use 'new' for new halls
        formData.append('alt_text', newHall.title);

        const uploadResponse = await uploadImage(formData);
        if (uploadResponse.data.status === 'success') {
          imagePath = uploadResponse.data.path;
        } else {
          alert('فشل في رفع الصورة');
          return;
        }
      }

      const hallData = {
        id: editHallId,
        title: newHall.title,
        description: newHall.description,
        location: newHall.location,
        price: newHall.price,
        owner_id: user.id
      };
       // send JSON, not FormData
      

      if (editHallId) {
        const res = await updateHall(editHallId, hallData);
        if (res.data.status === 'success') {
          alert('تم تعديل القاعة بنجاح');
        } else {
          alert('فشل في تعديل القاعة');
        }
      } else {
        const res = await createHall(hallData);
        if (res.data.status === 'success') {
          alert('تمت إضافة القاعة بنجاح');
        } else {
          alert('فشل في إضافة القاعة');
        }
      }

      setShowAddForm(false);
      setNewHall({ title: '', description: '', location: '', price: '', image: null });
      setEditHallId(null);
      window.location.reload();
    } catch (err) {
      console.error('Error creating/updating hall:', err);
      alert('حدث خطأ أثناء العملية');
    }
  };

  const handleEditHall = (hall) => {
    setNewHall(hall);
    setEditHallId(hall.id);
    setShowAddForm(true);
  };

  const handleDeleteHall = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف القاعة؟')) return;
  
    try {
      const res = await deleteHall({ id, owner_id: user.id }); // Pass an object!
      if (res.data.status === 'success') {
        alert('تم حذف القاعة بنجاح');
        setHalls(halls.filter(hall => hall.id !== id));
      } else {
        alert('فشل في حذف القاعة: ' + res.data.message);
      }
    } catch (err) {
      console.error('Error deleting hall:', err);
      alert('حدث خطأ أثناء حذف القاعة');
    }
  };
  const handleFileChange = (e) => {
    setNewHall({ ...newHall, image: e.target.files[0] });
  };

  const handleReservationAction = async (id, action) => {
    try {
      const res = await fetch(`/backend/admin/manage_bookings.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action })
      });
      const result = await res.json();
      if (result.status === 'success') {
        alert(`Reservation ${action}ed successfully`);
        setReservations(reservations.map(r => r.id === id ? { ...r, status: action } : r));
      } else {
        alert('Failed to update reservation');
      }
    } catch (err) {
      console.error('Error updating reservation:', err);
    }
  };

  if (loading) return <div className="text-center mt-5">جاري تحميل القاعات...</div>;

  return (
    <div className="d-flex" style={{ minHeight: '90vh' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', background: '#343a40', color: 'white' }}>
        <div className="p-3">
          <h4>لوحة التحكم</h4>
          <hr style={{ background: 'white' }} />
          <ul className="list-unstyled">
            <li 
              className={`mb-3 ${activeSection === 'halls' ? 'fw-bold' : ''}`}
              onClick={() => setActiveSection('halls')}
              style={{ cursor: 'pointer' }}
            >
              🏢 قاعاتي
            </li>
            <li 
              className={`mb-3 ${activeSection === 'reservations' ? 'fw-bold' : ''}`}
              onClick={() => setActiveSection('reservations')}
              style={{ cursor: 'pointer' }}
            >
              📅 الحجوزات
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        {activeSection === 'halls' && (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3>قاعاتي</h3>
              <button className="btn btn-success" onClick={() => {
                setShowAddForm(!showAddForm);
                setEditHallId(null);
                setNewHall({ title: '', description: '', location: '', price: '', image: null });
              }}>
                {showAddForm ? 'إلغاء' : '➕ إضافة قاعة'}
              </button>
            </div>

            {/* Form لإضافة أو تعديل قاعة */}
            {showAddForm && (
              <div className="card p-4 mb-4">
                <input
                  className="form-control mb-2"
                  placeholder="اسم القاعة"
                  value={newHall.title}
                  onChange={e => setNewHall({ ...newHall, title: e.target.value })}
                />
                <textarea
                  className="form-control mb-2"
                  placeholder="وصف القاعة"
                  value={newHall.description}
                  onChange={e => setNewHall({ ...newHall, description: e.target.value })}
                />
                <input
                  className="form-control mb-2"
                  placeholder="الموقع"
                  value={newHall.location}
                  onChange={e => setNewHall({ ...newHall, location: e.target.value })}
                />
                <input
                  className="form-control mb-2"
                  type="number"
                  placeholder="السعر بالريال"
                  value={newHall.price}
                  onChange={e => setNewHall({ ...newHall, price: e.target.value })}
                />
                <input
                  className="form-control mb-2"
                  type="file"
                  onChange={handleFileChange}
                />
                <button className="btn btn-primary w-100" onClick={handleAddOrUpdateHall}>
                  {editHallId ? 'تعديل القاعة' : 'حفظ القاعة'}
                </button>
              </div>
            )}

            {/* عرض القاعات */}
            <div className="row">
  {halls.length > 0 ? (
    halls.map(hall => (
      <div key={hall.id} className="col-md-6 col-lg-4 mb-4">
        <div className="card shadow-sm">
          {hall.image && (
            <img
              src={`/backend/images/${hall.image}`}
              className="card-img-top"
              alt={hall.title}
              style={{ height: '200px', objectFit: 'cover' }}
            />
          )}
          <div className="card-body">
            <h5 className="card-title">{hall.title}</h5>
            <p className="card-text">{hall.description}</p>
            <p><strong>📍 الموقع:</strong> {hall.location}</p>
            <p><strong>💰 السعر:</strong> {hall.price} ريال</p>
            <div className="d-flex justify-content-between">
              <button className="btn btn-warning btn-sm" onClick={() => handleEditHall(hall)}>تعديل</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteHall(hall.id)}>حذف</button>
            </div>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div>لا توجد قاعات مسجلة</div>
  )}
</div>

          </>
        )}

<div className="row">
  {reservations.length > 0 ? (
    reservations.map(reservation => (
      <div key={reservation.id} className="col-md-6 col-lg-4 mb-4">
        <div className="card border-light shadow-sm">
          <div className="card-body">
            <h5 className="card-title">{reservation.hall_title}</h5>
            <p className="card-text">
              <strong>📅 التاريخ:</strong> {reservation.date}<br />
              <strong>🕐 الوقت:</strong> {reservation.time_slot}<br />
              <strong>📌 الحالة:</strong> 
              <span className={`badge ms-2 ${
                reservation.status === 'approved' ? 'bg-success' : reservation.status === 'rejected' ? 'bg-danger' : 'bg-secondary'
              }`}>
                {reservation.status === 'approved' ? 'تم القبول' : reservation.status === 'rejected' ? 'مرفوض' : 'معلق'}
              </span>
            </p>
            <div className="d-flex justify-content-between">
              <button className="btn btn-sm btn-success" onClick={() => handleReservationAction(reservation.id, 'approved')}>قبول</button>
              <button className="btn btn-sm btn-danger" onClick={() => handleReservationAction(reservation.id, 'rejected')}>رفض</button>
            </div>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div>لا توجد حجوزات</div>
  )}
</div>

      </div>
    </div>
  );
};

export default OwnerDashboard;
