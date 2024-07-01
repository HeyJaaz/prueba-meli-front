'use client';

import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Switch, Typography, Box, Toolbar } from '@mui/material';
import { fetchProducts } from '../../util/apis';
import SearchProducts from './searchProducts';

const ProductList = () => {
  const [products, setProducts] = React.useState<any[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');

  React.useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || {};
    const allProducts = Object.values(storedProducts).flat();
    if (allProducts.length > 0) {
      setProducts(allProducts);
    } else {
      fetchProducts().then(data => {
        setProducts(data);
        persistProducts(data);
      });
    }

    window.addEventListener('storage', syncProducts);

    return () => {
      window.removeEventListener('storage', syncProducts);
    };
  }, []);

  const syncProducts = () => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || {};
    const allProducts = Object.values(storedProducts).flat();
    setProducts(allProducts);
  };

  const persistProducts = (products) => {
    let storedProducts = JSON.parse(localStorage.getItem('products')) || {};
    products.forEach(product => {
      if (!storedProducts[product.category]) {
        storedProducts[product.category] = [];
      }
      const productIndex = storedProducts[product.category].findIndex(p => p.id === product.id);
      if (productIndex !== -1) {
        storedProducts[product.category][productIndex] = product;
      } else {
        storedProducts[product.category].push(product);
      }
    });
    localStorage.setItem('products', JSON.stringify(storedProducts));
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ padding: { xs: 2, sm: 3, md: 5 } }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#364152', marginBottom: 3 }}>
        Product List
      </Typography>
      <Paper>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" id="tableTitle">
            Products
          </Typography>
          <SearchProducts searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </Toolbar>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">Image</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">On Store</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow
                  key={product.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {product.id}
                  </TableCell>
                  <TableCell align="left">
                    <Avatar src={product.image} alt={product.title} variant="square" sx={{ width: 56, height: 56 }} />
                  </TableCell>
                  <TableCell align="left">{product.title}</TableCell>
                  <TableCell align="left">{product.category}</TableCell>
                  <TableCell align="left">${product.price}</TableCell>
                  <TableCell align="left">
                    <Switch edge="end" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default ProductList;
