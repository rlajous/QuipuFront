import api from '../config/api';
import { Campaign } from '../constants/statisticsExample';

export const getStatistics = filter => {
  api.post('/companies/statistics');
  return { ok: true, data: Campaign[filter] };
};
