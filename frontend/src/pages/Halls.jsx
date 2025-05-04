import { useEffect, useState } from 'react';
import { getHalls } from '../api/api';
import HallCard from '../components/HallCard'; 
import FilterBar from '../components/FilterBar';
import '../style/Auth.css'; 

const Halls = () => {
  const [halls, setHalls] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const res = await getHalls();
        if (Array.isArray(res.data)) {
          setHalls(res.data);
          setFiltered(res.data);
        } else {
          setError('خطأ في تحميل بيانات القاعات.');
        }
      } catch (err) {
        setError('حدث خطأ أثناء تحميل القاعات.');
      } finally {
        setLoading(false);
      }
    };

    fetchHalls();
  }, []);

  const handleFilter = ({ search, sort }) => {
    let result = [...halls];

    if (search) {
      result = result.filter(hall =>
        hall.title?.toLowerCase().includes(search.toLowerCase()) ||
        hall.location?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === 'price_asc') result.sort((a, b) => a.price - b.price);
    if (sort === 'price_desc') result.sort((a, b) => b.price - a.price);
    if (sort === 'rating_desc') result.sort((a, b) => b.rating - a.rating);

    setFiltered(result);
  };

  return (
    <div className="auth-page"> {/* ✅ خلفية decor الموحدة */}
      <div className="container py-5 text-white">
        <h2 className="mb-4 text-center">قائمة القاعات المتاحة</h2>

        {typeof handleFilter === 'function' && <FilterBar onFilter={handleFilter} />}

        <div className="row">
          {loading ? (
            <div className="text-center">جاري تحميل القاعات...</div>
          ) : error ? (
            <div className="alert alert-danger text-center">{error}</div>
          ) : filtered.length > 0 ? (
            filtered.map(hall => (
              <div className="col-md-4 mb-3" key={hall.id}>
                <div className="bg-dark bg-opacity-75 rounded shadow-sm p-2">
                  <HallCard hall={hall} />
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">لا توجد قاعات حالياً.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Halls;
