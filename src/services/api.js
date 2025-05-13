const API_BASE = 'https://dummyjson.com/products';

// Función para normalizar imágenes a tamaño fijo
const normalizeProductImages = (product) => {
  return {
    ...product,
    thumbnail: product.thumbnail?.replace('/thumbnail/', '/300x300/') || 'https://via.placeholder.com/300',
    images: product.images?.map(img => 
      typeof img === 'string' 
        ? img.replace('/thumbnail/', '/600x600/') 
        : 'https://via.placeholder.com/600'
    ) || []
  };
};

/**
 * Obtiene productos paginados con imágenes normalizadas
 * @param {number} limit - Número de productos por página
 * @param {number} skip - Número de productos a saltar
 * @returns {Promise<{products: Array, total: number}>}
 */
export const fetchProducts = async (limit = 10, skip = 0) => {
  try {
    const response = await fetch(`${API_BASE}?limit=${limit}&skip=${skip}`);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const data = await response.json();
    return {
      products: data.products?.map(normalizeProductImages) || [],
      total: data.total || 0
    };
  } catch (error) {
    console.error("Fetch products error:", error);
    return { products: [], total: 0 };
  }
};

/**
 * Busca productos con paginación e imágenes normalizadas
 * @param {string} query - Término de búsqueda
 * @param {object} options - {limit: number, skip: number, exactMatch: boolean}
 * @returns {Promise<{products: Array, total: number}>}
 */
export const searchProducts = async (query, options = {}) => {
  try {
    if (!query?.trim()) return { products: [], total: 0 };

    const { 
      limit = 20, 
      skip = 0,
      exactMatch = false 
    } = options;
    const searchTerm = query.toLowerCase().trim();

    // Búsqueda por ID si el query es numérico
    if (!isNaN(searchTerm)) {
      const product = await getProductById(searchTerm);
      const normalizedProduct = product ? normalizeProductImages(product) : null;
      return {
        products: normalizedProduct ? [normalizedProduct] : [],
        total: normalizedProduct ? 1 : 0
      };
    }

    const response = await fetch(`${API_BASE}/search?q=${encodeURIComponent(searchTerm)}&limit=${limit}&skip=${skip}`);
    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const data = await response.json();
    if (!Array.isArray(data.products)) return { products: [], total: 0 };

    // Sistema de puntuación de relevancia
    const scoredProducts = data.products.map(product => ({
      ...product,
      score: calculateRelevanceScore(product, searchTerm)
    }));

    // Filtrar y ordenar
    let results = scoredProducts
      .filter(p => p.score > 0)
      .sort((a, b) => b.score - a.score);

    // Filtrado exacto si se requiere
    if (exactMatch) {
      results = results.filter(p =>
        p.title.toLowerCase().includes(searchTerm)
      );
    }

    return {
      products: results.slice(0, limit).map(normalizeProductImages),
      total: data.total || results.length
    };
  } catch (error) {
    console.error("Search error:", error);
    return { products: [], total: 0 };
  }
};

/**
 * Obtiene productos por categoría con paginación e imágenes normalizadas
 * @param {string} category - Categoría a buscar
 * @param {object} options - {limit: number, skip: number}
 * @returns {Promise<{products: Array, total: number}>}
 */
export const getProductsByCategory = async (category, options = {}) => {
  try {
    const { limit = 20, skip = 0 } = options;
    const response = await fetch(`${API_BASE}/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const data = await response.json();
    return {
      products: data.products?.map(normalizeProductImages) || [],
      total: data.total || 0
    };
  } catch (error) {
    console.error("Get products by category error:", error);
    return { products: [], total: 0 };
  }
};

/**
 * Obtiene un producto por ID con imágenes normalizadas
 * @param {string|number} productId - ID del producto
 * @returns {Promise<object|null>}
 */
export const getProductById = async (productId) => {
  try {
    const response = await fetch(`${API_BASE}/${productId}`);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const product = await response.json();
    return normalizeProductImages(product);
  } catch (error) {
    console.error("Get product by ID error:", error);
    return null;
  }
};

/**
 * Obtiene todas las categorías disponibles
 * @returns {Promise<Array>}
 */
export const getCategories = async () => {
  try {
    const response = await fetch(`${API_BASE}/categories`);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Get categories error:", error);
    return [];
  }
};

/**
 * Obtiene productos relacionados con imágenes normalizadas
 * @param {string} category - Categoría para buscar productos relacionados
 * @param {number} limit - Límite de resultados
 * @returns {Promise<Array>}
 */
export const getRelatedProducts = async (category, limit = 4) => {
  try {
    const response = await fetch(`${API_BASE}/category/${encodeURIComponent(category)}?limit=${limit}`);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const data = await response.json();
    return data.products?.map(normalizeProductImages) || [];
  } catch (error) {
    console.error("Get related products error:", error);
    return [];
  }
};

// Función auxiliar para calcular relevancia
const calculateRelevanceScore = (product, term) => {
  let score = 0;
  const fields = [
    { field: 'title', weight: 3 },
    { field: 'category', weight: 2 },
    { field: 'brand', weight: 2 },
    { field: 'description', weight: 1 }
  ];

  fields.forEach(({ field, weight }) => {
    if (product[field]?.toLowerCase().includes(term)) {
      score += weight;
    }
  });

  return score;
};