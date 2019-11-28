import api from '../config/api';

export const getSellers = ({ page, amount }) => api.get(`/api/auth/sellers?page=${page}&amount=${amount}`);

export const getBuyers = ({ page, amount }) => api.get(`/api/auth/buyers?page=${page}&amount=${amount}`);
