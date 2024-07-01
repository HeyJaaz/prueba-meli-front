'use client';

import * as React from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Typography, Grid, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';
import { fetchProductsByCategory, deleteProduct, addProduct, fetchCategories } from '../../util/apis';
import AddProduct from './addProduct';
import SearchProducts from './searchProducts';
import './products.css';

const ProductsByCategory = () => {
  const [products, setProducts] = React.useState<any[]>([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<any>(null);
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const [newProduct, setNewProduct] = React.useState({
    title: '',
    price: '',
    description: '',
    image: '',
    category: ''
  });
  const [categories, setCategories] = React.useState<string[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  React.useEffect(() => {
    if (category) {
      const storedProducts = JSON.parse(localStorage.getItem('products')) || {};
      const productsByCategory = storedProducts[category] || [];
      if (productsByCategory.length > 0) {
        setProducts(productsByCategory);
      } else {
        fetchProductsByCategory(category).then(products => {
          setProducts(products);
          persistProducts(category, products);
        });
      }
      fetchCategories().then(setCategories);
      setNewProduct(prevProduct => ({
        ...prevProduct,
        category: category
      }));
    }
  }, [category]);

  const persistProducts = (category, products) => {
    let storedProducts = JSON.parse(localStorage.getItem('products')) || {};
    storedProducts[category] = products;
    localStorage.setItem('products', JSON.stringify(storedProducts));
  };

  const handleOpenDialog = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  const handleDelete = (id) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    persistProducts(category, updatedProducts);
    if (id < 21) {
      deleteProduct(id).then(() => {
        setOpenDialog(false);
      }).catch(error => {
        console.error('Error deleting product:', error);
      });
    } else {
      setOpenDialog(false);
    }
  };

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewProduct({
      title: '',
      price: '',
      description: '',
      image: '',
      category: category || ''
    });
  };

  const handleAddProduct = () => {
    if (!newProduct.title || !newProduct.price || !newProduct.description || !newProduct.image || !newProduct.category) {
      alert('All fields are required');
      return;
    }

    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    const newProductWithId = { ...newProduct, id: newId };

    const updatedProducts = [...products, newProductWithId];
    setProducts(updatedProducts);
    persistProducts(category, updatedProducts);

    addProduct(newProductWithId).catch(error => {
      console.error('Error adding product to the API:', error);
    });

    setOpenAddDialog(false);
    setNewProduct({
      title: '',
      price: '',
      description: '',
      image: '',
      category: category || ''
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.title && product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ padding: { xs: 2, sm: 3, md: 5 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, p: 2, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#364152' }}>CATEGORY {category.toUpperCase()}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SearchProducts searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenAddDialog}
            sx={{
              ml: 2,
              color: '#0288d1',
              '&:hover': {
                backgroundColor: '#CCECFE',
              }
            }}
          >
            Add Product
          </Button>
        </Box>
      </Box>
      <Grid container spacing={4} justifyContent="center">
        {filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={3}>
            <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <CardHeader />
              <CardMedia
                component="img"
                sx={{ objectFit: 'contain', height: '200px', width: '100%', padding: '5px' }}
                image={product.image}
                alt={product.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    height: '3rem',
                    lineHeight: '1.5rem',
                    textAlign: 'justify',
                    fontWeight: '500'
                  }}
                >
                  {product.title}
                </Typography>
                <Typography
                  variant="body"
                  color="text.secondary"
                  sx={{
                    textAlign: 'right', 
                    marginTop: '0.5rem',
                    marginRight: '1rem', 
                    
                    color: '#7e57c2',
                  }}
                >
                  {product.category.toUpperCase()}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    textAlign: 'end',
                    marginTop: '0.5rem',
                    fontWeight: '500',
                    color: 'rgb(12 15 16 / 66%)'
                  }}
                >
                  Price: ${product.price}
                </Typography>
              </CardContent>
              <CardActions sx={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', mt: 1, mb: 1 }}>
                <Link href={`/detailProduct?id=${product.id}&category=${product.category}`} passHref>
                  <Button
                    size="small"
                    sx={{
                      marginRight: '5px',
                      color: '#43a047',
                      backgroundColor: '#fff',
                      border: '2px solid #43a047',
                      fontWeight: 'bold',
                      borderRadius: '5px',
                      padding: '3px 10px',
                      '&:hover': {
                        backgroundColor: '#43a047',
                        color: '#FFF',
                        border: '0px'
                      }
                    }}
                  >
                    Details
                  </Button>
                </Link>
                <Button
                  size="small"
                  startIcon={<DeleteIcon />}
                  sx={{
                    marginRight: '5px',
                    color: '#d32f2f',
                    backgroundColor: '#fff',
                    border: '2px solid #d32f2f',
                    fontWeight: 'bold',
                    borderRadius: '5px',
                    padding: '3px 10px',
                    '&:hover': {
                      backgroundColor: '#d32f2f',
                      color: '#FFF',
                      border: '0px'
                    }
                  }}
                  onClick={() => handleOpenDialog(product)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Delete"}
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the product "{selectedProduct?.title}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: '#f44336' }}>
            Cancel
          </Button>
          <Button onClick={() => handleDelete(selectedProduct?.id)} sx={{ color: '#f44336' }} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <AddProduct
        open={openAddDialog}
        handleClose={handleCloseAddDialog}
        product={newProduct}
        categories={categories}
        handleChange={handleInputChange}
        handleAdd={handleAddProduct}
      />
    </Box>
  );
};

export default ProductsByCategory;
