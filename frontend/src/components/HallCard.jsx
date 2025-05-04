import React from 'react';
import { Link } from 'react-router-dom';
import '../style/HallCard.css'; 

const HallCard = ({ hall }) => {
  const images = hall.images || []; 

  return (
    <div className="hall-card shadow-lg rounded overflow-hidden" >
      {/* ✅ سلايدر الصور */}
      {images.length > 0 && (
        <div id={`carousel-${hall.id}`} className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {images.map((img, index) => (
              <div
                className={`carousel-item ${index === 0 ? 'active' : ''}`}
                key={index}
              >
                <img
                  src={img}
                  className="d-block w-100"
                  alt={`صورة ${index + 1}`}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>

          {/* أسهم التنقل */}
          {images.length > 1 && (
            <>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target={`#carousel-${hall.id}`}
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" />
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target={`#carousel-${hall.id}`}
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" />
              </button>
            </>
          )}
        </div>
      )}

      <div className="hall-card-body p-3">
        <h5 className="hall-title">{hall.title}</h5>
        <p className="hall-location">📍 {hall.location}</p>
        <p className="hall-price">💰 {hall.price} </p>
        <Link to={`/hall/${hall.id}`} className="btn btn-outline-light w-100 mt-2">
          التفاصيل
        </Link>
      </div>
    </div>
  );
};

export default HallCard;
