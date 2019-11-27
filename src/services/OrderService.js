import api from '../config/api';

export const buy = order => api.post('/api/auth/buyTokens', order);

export const sell = order => api.post('/api/auth/sellTokens', order);
