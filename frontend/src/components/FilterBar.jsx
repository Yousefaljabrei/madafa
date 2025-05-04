import { useState } from 'react';

const FilterBar = ({ onFilter }) => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');

  const handleFilter = () => {
    onFilter({ search, sort });
  };

  return (
    <div className="d-flex flex-wrap gap-2 mb-4 align-items-center">
      <input
        type="text"
        className="form-control flex-grow-1"
        placeholder="بحث بالعنوان أو الموقع"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select className="form-select flex-grow-1" onChange={(e) => setSort(e.target.value)}>
        <option value="">الترتيب حسب</option>
        <option value="price_asc">السعر: من الأقل</option>
        <option value="price_desc">السعر: من الأعلى</option>
        <option value="rating_desc">الأعلى تقييماً</option>
      </select>
      <button className="btn btn-primary" onClick={handleFilter}>تصفية</button>
    </div>
  );
};

export default FilterBar;
