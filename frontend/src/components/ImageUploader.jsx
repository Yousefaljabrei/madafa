import { useState } from 'react';
import { uploadImage } from '../api/api';

const ImageUploader = ({ hallId, onUploaded }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert('اختر صور أولاً');
      return;
    }

    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`images[]`, file);
    });
    formData.append('hall_id', hallId);

    try {
      setUploading(true);
      const res = await uploadImage(formData);

      if (res.data.status === 'success') {
        alert('تم رفع الصور بنجاح');
        onUploaded && onUploaded(res.data.paths);
      } else {
        alert('فشل رفع الصور');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError('فشل رفع الصور');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-4">
      <input type="file" className="form-control mb-2" onChange={handleFileChange} multiple />
      <button 
        className="btn btn-primary w-100" 
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? 'جارٍ الرفع...' : 'رفع الصور'}
      </button>
      {error && <div className="alert alert-danger mt-2">{error}</div>}
    </div>
  );
};

export default ImageUploader;
