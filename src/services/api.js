import axios from 'axios';

const API_BASE_URL = 'https://api.mercadolibre.com';

// Búsqueda de productos: https://api.mercadolibre.com/sites/MLA/search?q=teclado
export const searchProducts = async (query, filters = {}) => {
  try {
    // Construir los parámetros de consulta
    const params = new URLSearchParams();
    params.append('q', query);
    
    // Añadir filtros opcionales
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        params.append(key, filters[key]);
      }
    });
    
    const response = await axios.get(`${API_BASE_URL}/sites/MLA/search`, { params });
    return response.data;
  } catch (error) {
    console.error('Error buscando productos:', error);
    throw error;
  }
};

// Detalles de un producto: https://api.mercadolibre.com/items/MLA1377454181
export const getProductDetails = async (productId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/items/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo detalles del producto:', error);
    throw error;
  }
};

// Descripción de un producto
export const getProductDescription = async (productId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/items/${productId}/description`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo descripción del producto:', error);
    return { plain_text: 'No hay descripción disponible' };
  }
};

// Obtener categorías
export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/sites/MLA/categories`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo categorías:', error);
    throw error;
  }
};

// Obtener productos por categoría
export const getProductsByCategory = async (categoryId, filters = {}) => {
  try {
    const params = new URLSearchParams();
    params.append('category', categoryId);
    
    // Añadir filtros opcionales
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        params.append(key, filters[key]);
      }
    });
    
    const response = await axios.get(`${API_BASE_URL}/sites/MLA/search`, { params });
    return response.data;
  } catch (error) {
    console.error('Error obteniendo productos por categoría:', error);
    throw error;
  }
};