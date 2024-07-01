import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { InputBase, Box, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

const Search = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  '&.search': {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    border: '1px solid #364152',
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
      border: '1px solid #364152',
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  '&.searchIconWrapper': {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: theme.transitions.create('color'),
    color: '#364152',
    '&:hover': {
      backgroundColor: '#EC9C3D',
    },
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  ...theme.typography.button,
  '&.styledInputBase': {
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  },
}));

const SearchProducts = ({ searchQuery, setSearchQuery, handleOpenAddDialog }) => {
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Search className="search">
        <SearchIconWrapper className="searchIconWrapper">
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search product..."
          inputProps={{ 'aria-label': 'search' }}
          value={searchQuery}
          onChange={handleSearchChange}
          className="styledInputBase"
        />
      </Search>
    </Box>
  );
};

export default SearchProducts;
