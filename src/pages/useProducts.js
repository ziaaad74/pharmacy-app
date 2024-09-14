import { useState, useEffect } from 'react';
import axios from 'axios';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(response => setProducts(response.data))
      .catch(err => setError(err));
  }, []);

  const createProduct = (newProduct) => {
    axios.post('http://localhost:5000/products', newProduct)
      .then(response => setProducts([...products, response.data]))
      .catch(err => setError(err));
  };

  const updateProduct = (id, updatedProduct) => {
    axios.put(`http://localhost:5000/products/${id}`, updatedProduct)
      .then(response => {
        setProducts(products.map(product =>
          product.id === id ? response.data : product
        ));
      })
      .catch(err => setError(err));
  };

  const deleteProduct = (id) => {
    axios.delete(`http://localhost:5000/products/${id}`)
      .then(() => setProducts(products.filter(product => product.id !== id)))
      .catch(err => setError(err));
  };

  return { products, error, createProduct, updateProduct, deleteProduct };
};
