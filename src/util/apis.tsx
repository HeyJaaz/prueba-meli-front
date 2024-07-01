export const fetchProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return data;
  };
  
  export const deleteProduct = async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  };
  
  export const addProduct = async (product) => {
    const response = await fetch('https://fakestoreapi.com/products', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  };
  
  export const fetchCategories = async () => {
    const response = await fetch('https://fakestoreapi.com/products/categories');
    const data = await response.json();
    return data;
  };
  
  export const fetchProductById = async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await response.json();
    return data;
  };
  
  export const fetchProductFromLocalStorageById = (category, id) => {
    const storedProducts = JSON.parse(localStorage.getItem(`products-${category}`) || '[]');
    return storedProducts.find(product => product.id === id);
  };
  
  export const updateProduct = async (id, product) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  };

  export const fetchProductsByCategory = async (category) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  };