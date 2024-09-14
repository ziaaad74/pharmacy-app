import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from './useProducts';

function HomePage() {
  const { products, error, createProduct, updateProduct, deleteProduct } = useProducts();
  const [newProduct, setNewProduct] = useState({ name: '', price: 0, description: '' });
  const [editProduct, setEditProduct] = useState(null);

  if (error) return <div>Error loading products...</div>;

  
  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  
  const handleAddProduct = () => {
    createProduct(newProduct);
    setNewProduct({ name: '', price: 0, description: '' }); 
  };

  
  const handleUpdateProduct = (id) => {
    if (editProduct) {
      updateProduct(id, editProduct);
      setEditProduct(null); 
    }
  };

  return (
    <div>
      <h1>Pharmacy Products</h1>

  
      <h2>Add New Product</h2>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Product Price"
          value={newProduct.price}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Product Description"
          value={newProduct.description}
          onChange={handleChange}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                {editProduct && editProduct.id === product.id ? (
                  <input
                    type="text"
                    defaultValue={product.name}
                    onChange={(e) => setEditProduct({ ...product, name: e.target.value })}
                  />
                ) : (
                  product.name
                )}
              </td>
              <td>
                {editProduct && editProduct.id === product.id ? (
                  <input
                    type="number"
                    defaultValue={product.price}
                    onChange={(e) => setEditProduct({ ...product, price: e.target.value })}
                  />
                ) : (
                  product.price
                )}
              </td>
              <td>
                <Link to={`/products/${product.id}`}>See More</Link>
                <button onClick={() => deleteProduct(product.id)}>Delete</button>
                {editProduct && editProduct.id === product.id ? (
                  <button onClick={() => handleUpdateProduct(product.id)}>Save</button>
                ) : (
                  <button onClick={() => setEditProduct(product)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HomePage;
