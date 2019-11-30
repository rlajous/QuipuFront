import api from '../config/api';

export const getTransactions = ({ page, amount }) =>
  api.get(`/api/auth/transactions?page=${page}&amount=${amount}`);
