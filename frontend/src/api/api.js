import axios from 'axios';

const BASE_URL = 'http://localhost:8000/'; // Use 127.0.0.1 to avoid CORS/local issues

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 🔑 AUTH
export const login = (data) => api.post('auth/login.php', data);
export const register = (data) => api.post('auth/register.php', data);

// 🏢 HALLS
export const getHalls = () => api.get('halls/read.php');
export const getHallById = (id) => api.get(`halls/read.php?id=${id}`);
export const getHallsByOwner = (owner_id) => api.get(`halls/read.php?owner_id=${owner_id}`);
export const createHall = (data) => api.post('halls/create.php', data);
export const updateHall = (data) => api.post('halls/update.php', data);
export const deleteHall = (data) => api.post('halls/delete.php', data);
export const updateHallStatus = (hallId, action) => api.post('halls/update.php', { hall_id: hallId, action });

// 📆 BOOKINGS
export const createBooking = (data) => api.post('bookings/create.php', data);
export const getBookingsByUser = (user_id) => api.get(`bookings/read.php?user_id=${user_id}`);
export const getBookingsByOwner = (owner_id) => api.get(`bookings/get_bookings_by_owner.php?owner_id=${owner_id}`);
export const getCalendarByHall = (hall_id) => api.get(`bookings/calendar.php?hall_id=${hall_id}`);


// ⭐ REVIEWS
export const postReview = (data) => api.post('reviews/create.php', data);
export const getReviewsByHall = (hall_id) => api.get(`reviews/read.php?hall_id=${hall_id}`);

// 🧑‍⚖️ ADMIN
export const getAllUsers = () => api.get('admin/manage_users.php');
export const getAllHalls = () => api.get('admin/manage_halls.php');
export const getAllBookings = () => api.get('admin/manage_bookings.php');
export const deleteUser = (id) => api.post('admin/delete_user.php', { id });
export const updateUserRole = (id, role) => api.post('admin/update_user_role.php', { id, role });

// 📥 IMAGE UPLOAD
export const uploadImage = (formData) => axios.post(BASE_URL + 'images/upload.php', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

// 📤 IMAGE DELETE
export const deleteImage = (data) => api.post('images/delete.php', data);
