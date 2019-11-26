import api from '../config/api';

export const Campaign = {
  total: {
    cars: 25,
    impresions: 5320000,
    km: 180000
  }
};

export const getCampaign = () => {
  api.post('/companies/cars');
  return { ok: true, data: Campaign };
};
