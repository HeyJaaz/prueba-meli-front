'use client';

import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import StoreIcon from '@mui/icons-material/Store';
import Link from 'next/link';
import ListItemButton from '@mui/material/ListItemButton';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: '#FFF', // Fondo del menú
  color: 'rgb(54, 65, 82)', // Texto del menú
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
  backgroundColor: '#FFF', // Fondo del área de Menu
  color: 'rgb(54, 65, 82)', // Texto del menú en blanco
}));

const CustomAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: 'white', // Fondo blanco
  color: 'black', // Color del texto
  marginLeft: drawerWidth,
  width: `calc(100% - ${drawerWidth}px)`,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));

const CustomDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
);

const CustomLink = styled(Link)({
  textDecoration: 'none',
  color: 'rgb(54, 65, 82)',
  '&:hover': {
    textDecoration: 'none',
    color: '#009688',
  },
});

const Sidebar = ({ children }) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <CustomAppBar position="fixed">
        <Toolbar>
          <Typography variant="body2" noWrap component="div">
            E-com Admin Dashboard
          </Typography>
        </Toolbar>
      </CustomAppBar>
      <CustomDrawer variant="permanent">
        <DrawerHeader>
          <Typography variant="h6" noWrap component="div">
            Menu
          </Typography>
        </DrawerHeader>
        <Divider />
        <List>
          <CustomLink
            sx={{
              '&:hover': {
                backgroundColor: '#E0F2F1',
                '& .MuiListItemIcon-root': {
                  color: '#009688'
                }
              }
            }}
            href="/" passHref
          >
            <ListItemButton sx={{
              '&:hover': {
                backgroundColor: '#E0F2F1'
              }
            }}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </CustomLink>
          <CustomLink
            sx={{
              '&:hover': {
                backgroundColor: '#E0F2F1',
                '& .MuiListItemIcon-root': {
                  color: '#009688',
                },
              }
            }}
            href="/categories" passHref
          >
            <ListItemButton sx={{
              '&:hover': {
                backgroundColor: '#E0F2F1'
              }
            }}>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Categories" />
            </ListItemButton>
          </CustomLink>
          <CustomLink
            sx={{
              '&:hover': {
                backgroundColor: '#E0F2F1',
                '& .MuiListItemIcon-root': {
                  color: '#009688'
                },
              }
            }}
            href="/products" passHref
          >
            <ListItemButton sx={{
              '&:hover': {
                backgroundColor: '#E0F2F1'
              }
            }}>
              <ListItemIcon>
                <StoreIcon />
              </ListItemIcon>
              <ListItemText primary="Product List" />
            </ListItemButton>
          </CustomLink>
        </List>
        <Divider />
      </CustomDrawer>
      <Box component="main" sx={{ flexGrow: 1, paddingTop: '60px', paddingLeft: '25px', paddingRight: '25px' }}>
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;
