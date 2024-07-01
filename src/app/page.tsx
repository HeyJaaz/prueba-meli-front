'use client';

import * as React from 'react';
import { Typography, Grid, Paper, Box, List, ListItem, ListItemIcon, ListItemText, Link, Stack, LinearProgress } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import PhoneIcon from '@mui/icons-material/Phone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PersonIcon from '@mui/icons-material/Person';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import DvrIcon from '@mui/icons-material/Dvr';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import { fetchProducts } from '../util/apis';

const Page = () => {
  const [data, setData] = React.useState([]);
  const [totalProducts, setTotalProducts] = React.useState(0);
  const [totalCategories, setTotalCategories] = React.useState(0);
  const [activeIndex, setActiveIndex] = React.useState(-1);

  React.useEffect(() => {
    fetchProducts().then((products) => {
      const categories = products.reduce((acc, product) => {
        const category = acc.find(c => c.category === product.category);
        if (category) {
          category.products += 1;
        } else {
          acc.push({ category: product.category, products: 1 });
        }
        return acc;
      }, []);

      setData(categories);
      setTotalProducts(products.length);
      setTotalCategories(categories.length);
    });
  }, []);

  const handleMouseEnter = (data, index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(-1);
  };

  const cardData = [
    { title: 'Total Sales', value: '$76,96,432', subtitle: 'Coming Soon', icon: <KeyboardDoubleArrowUpIcon color="success" /> },
    { title: 'Total Order', value: '1645', subtitle: 'Coming Soon', icon: <DvrIcon sx={{color:'#f44336'}}  /> },
    { title: 'Total Categories', value: totalCategories, subtitle: 'All Categories', icon: <CategoryIcon sx={{color:'#2196f3'}} /> },
    { title: 'Total Products', value: totalProducts, subtitle: 'All products', icon: <InventoryIcon sx={{color:'#9c27b0'}} /> }
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Grid container spacing={2} sx={{ flex: 1, padding: 3 }}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper 
              elevation={6} 
              sx={{ 
                borderRadius: '10px',
                height: '100%', 
                backgroundColor: '#fff', 
                boxShadow: '0px 3px 6px rgba(0,0,0,0.16)',
                p: 2
              }} 
            >
              <Typography variant="h6" gutterBottom>
                {card.title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4">
                  {card.value}
                </Typography>
                {card.icon}
              </Box>
              <Typography variant="subtitle1" color="textSecondary">
                {card.subtitle}
              </Typography>
            </Paper>
          </Grid>
        ))}
        <Grid item xs={12} sm={6} md={8}>
          <Paper 
            elevation={6} 
            sx={{ 
              borderRadius: '10px',
              backgroundColor: '#fff', 
              boxShadow: '0px 3px 6px rgba(0,0,0,0.16)',
              p: 2
            }} 
          >
            <Typography variant="h6" gutterBottom>
            Products by Category
            </Typography>
            <Box sx={{ width: '100%', height: { xs: 300, sm: 400 } }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                  onMouseLeave={handleMouseLeave}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" tickFormatter={(tick) => tick.toUpperCase()} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="products" fill="#E0F2F1" onMouseEnter={handleMouseEnter}>
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === activeIndex ? '#009688' : '#E0F2F1'}
                        style={{ cursor: 'pointer' }}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper 
            elevation={6} 
            sx={{ 
              borderRadius: '10px',
              backgroundColor: '#fff', 
              boxShadow: '0px 3px 6px rgba(0,0,0,0.16)',
              p: 2
            }} 
          >
            <Typography variant="h6" gutterBottom>
              Additional Information
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Name" secondary="Jazhel Becerril Marquez" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PhoneIcon />
                </ListItemIcon>
                <ListItemText primary="Cell phone" secondary="+52 5579921174" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LinkedInIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="LinkedIn"
                  secondary={
                    <Link
                      sx={{color:'blue'}} href="https://www.linkedin.com/in/jazhel-becerril-52727518b/" target="_blank" rel="noopener">
                      Look it
                    </Link>
                  }
                />
              </ListItem>
              <ListItem>
                <Typography variant="h6">
                  Frontend Technical Test
                </Typography>
                <ListItemText />
              </ListItem>
              <ListItem>
                <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={1}>
                  <LinearProgress color="secondary" />
                </Stack>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Page;
