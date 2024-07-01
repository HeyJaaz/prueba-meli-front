'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, Typography, Card, CardContent, CardMedia, Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton, Select, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { fetchCategories, updateProduct,fetchProductById } from '../../util/apis';

const DetailProduct = () => {
  const [product, setProduct] = React.useState<any>(null);
  const [categories, setCategories] = React.useState<string[]>([]);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [editedProduct, setEditedProduct] = React.useState<any>({});
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const category = searchParams.get('category');  

  React.useEffect(() => {
    if (id && category) {
      const storedProducts = JSON.parse(localStorage.getItem('products')) || {};
      const localProduct = storedProducts[category]?.find((p) => p.id === parseInt(id));
      if (localProduct) {
        setProduct(localProduct);
        setEditedProduct(localProduct);
      } else {
        fetchProductById(id).then((data) => {
          setProduct(data);
          setEditedProduct(data);
        });
      }
    }

    fetchCategories().then(setCategories);
  }, [id, category]);

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleEditSubmit = () => {
    updateProduct(id, editedProduct).then((data) => {
      setProduct(data);
      setOpenEditDialog(false);
      persistProductData(category, data);
    });
  };

  const persistProductData = (category, data) => {
    let products = JSON.parse(localStorage.getItem('products')) || {};
    products[category] = products[category] || [];
    const productIndex = products[category].findIndex(product => product.id === data.id);
    if (productIndex !== -1) {
      products[category][productIndex] = data;
    } else {
      products[category].push(data);
    }
    localStorage.setItem('products', JSON.stringify(products));
  };

  if (!product) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  return (
    <Box sx={{ padding: { xs: 2, sm: 3, md: 5 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, p: 2, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#364152' }}>PRODUCT'S DETAIL</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}></Box>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Card sx={{ height: '100%' }}>
            <CardMedia component="img" image={product.image} alt={product.title} sx={{ height: '400px', objectFit: 'contain' }} />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#364152' }}>
                {product.title}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: '1rem', fontWeight: '500' }}>
                PRICE:
              </Typography>
              <Typography variant="body1" sx={{ marginTop: '1rem', fontWeight: '500', color: '#43a047' }}>
                ${product.price}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: '1rem', fontWeight: '500' }}>
                CATEGORY:
              </Typography>
              <Typography variant="body1" sx={{ marginTop: '1rem', fontWeight: '500', color: '#7e57c2' }}>
                {product.category.toUpperCase()}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: '1rem', flexGrow: 1, fontWeight: '500', color: '#212121' }}>
                DESCRIPTION:
              </Typography>
              <Typography variant="body2" sx={{ marginTop: '1rem', flexGrow: 1 }}>
                {product.description}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    color: '#ba68c8',
                    backgroundColor: '#fff',
                    border: '2px solid #ba68c8',
                    fontWeight: 'bold',
                    borderRadius: '5px',
                    marginTop: '1rem',
                    '&:hover': {
                      backgroundColor: '#ba68c8',
                      color: '#FFF',
                      border: '0px',
                    },
                  }}
                  onClick={() => setOpenEditDialog(true)}
                >
                  Edit Product
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Edit Product
          <IconButton
            aria-label="close"
            onClick={() => setOpenEditDialog(false)}
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
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            value={editedProduct.title}
            onChange={handleEditChange}
            sx={{ marginBottom: '1rem' }}
          />
          <TextField
            margin="dense"
            name="price"
            label="Price"
            type="number"
            fullWidth
            variant="outlined"
            value={editedProduct.price}
            onChange={handleEditChange}
            sx={{ marginBottom: '1rem' }}
          />
          <Select
            margin="dense"
            name="category"
            label="Category"
            fullWidth
            variant="outlined"
            value={editedProduct.category}
            onChange={handleEditChange}
            sx={{ marginBottom: '1rem' }}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            value={editedProduct.description}
            onChange={handleEditChange}
            multiline
            rows={5}
            sx={{ marginBottom: '1rem' }}
          />
          <TextField
            margin="dense"
            name="image"
            label="Image URL"
            type="text"
            fullWidth
            variant="outlined"
            value={editedProduct.image}
            onChange={handleEditChange}
            sx={{ marginBottom: '1rem' }}
          />
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpenEditDialog(false)} 
            size="small"
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
          >
            Cancel 
          </Button>
          <Button 
            onClick={handleEditSubmit}  
            autoFocus
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
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DetailProduct;
