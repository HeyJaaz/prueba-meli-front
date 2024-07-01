import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, MenuItem, DialogActions, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AddProduct = ({ open, handleClose, product = {}, categories, handleChange, handleAdd }) => {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
      <DialogTitle id="form-dialog-title">
        {"Add New Product"}
        <IconButton
          aria-label="close"
          onClick={handleClose}
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
          label="Product Title"
          type="text"
          fullWidth
          value={product.title || ''}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="price"
          label="Price"
          type="number"
          fullWidth
          value={product.price || ''}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          type="text"
          multiline
          rows={5}
          fullWidth
          value={product.description || ''}
          onChange={handleChange}
          sx={{ overflow: 'auto' }}
        />
        <TextField
          margin="dense"
          name="image"
          label="Image URL"
          type="text"
          fullWidth
          value={product.image || ''}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="category"
          label="Category"
          select
          fullWidth
          value={product.category || ''}
          onChange={handleChange}
          disabled={!!product.category} 
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: '#f44336' }}>
          Cancel
        </Button>
        <Button onClick={handleAdd} sx={{ color: '#f44336' }} autoFocus>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProduct;
