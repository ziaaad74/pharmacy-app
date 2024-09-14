import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/products/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error("Error fetching product details:", error);
      });
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
    </div>
  );
}

export default ProductDetails;
