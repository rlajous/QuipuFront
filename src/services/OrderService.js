import api from '../config/api';

export const buy = order => api.post('/api/auth/buyTokens', order);

export const sell = order => api.post('/api/auth/sellTokens', order);

export const getPurchases = ({ page, amount }) =>
  api.get(`/api/auth/purchases?page=${page}&amount=${amount}`);

export const getSells = ({ page, amount }) => api.get(`/api/auth/sells?page=${page}&amount=${amount}`);
