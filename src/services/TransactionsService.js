import api from '../config/api';

export const getTransactions = () => api.get('/api/auth/transactions');

export const getMovingCars = () => api.post('/api/auth/transactions');

export const getHeatCars = () => api.post('/api/auth/transactions');
