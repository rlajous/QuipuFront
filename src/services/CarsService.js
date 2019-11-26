import { create } from 'apisauce';

import api from '../config/api';

export const Cars = [
  { id: 0, brand: 'Volkswagen', model: 'Gol 1.8L', year: 2016, type: 'Parcial' },
  { id: 1, brand: 'Volkswagen', model: 'Gol 1.8L', year: 2016, type: 'Parcial' },
  { id: 2, brand: 'Volkswagen', model: 'Gol 1.8L', year: 2016, type: 'Parcial' },
  { id: 3, brand: 'Volkswagen', model: 'Gol 1.8L', year: 2016, type: 'Parcial' },
  { id: 4, brand: 'Volkswagen', model: 'Gol 1.8L', year: 2016, type: 'Parcial' },
  { id: 5, brand: 'Volkswagen', model: 'Gol 1.8L', year: 2016, type: 'Parcial' },
  { id: 6, brand: 'Volkswagen', model: 'Gol 1.8L', year: 2016, type: 'Parcial' },
  { id: 7, brand: 'Volkswagen', model: 'Gol 1.8L', year: 2016, type: 'Parcial' }
];

export const getCars = () => {
  api.post('/companies/cars');
  return { ok: true, data: Cars };
};

const baseURL = 'https://docs.mapbox.com/mapbox-gl-js/assets';

const mapApi = create({
  baseURL,
  timeout: 15000
});

export const getMovingCars = () => mapApi.get('hike.geojson');

export const getHeatCars = () => mapApi.get('earthquakes.geojson');
