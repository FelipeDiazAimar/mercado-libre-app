import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.mercadolibre.com'
});

export const searchProducts = (query) => {
  return api.get(`/sites/MLA/search?q=${query}&limit=12`);
};

export const getProduct = (id) => {
  return api.get(`/items/${id}`);
};

export const getProductDescription = (id) => {
  return api.get(`/items/${id}/description`);
};

export const getFeaturedProducts = () => {
  return api.get('/sites/MLA/search?q=iphone&limit=6');
};