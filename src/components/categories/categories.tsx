'use client';

import * as React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Box, ButtonBase } from '@mui/material';
import Link from 'next/link';
import { fetchCategories } from '../../util/apis';
import './categories.css';

const categoryImages = {
  "women's clothing": '/images/Womensclothing.png',
  "men's clothing": '/images/Mensclothing.png',
  "jewelery": '/images/Jewelery.png',
  "electronics": '/images/Electronics.png'
};

const Categories = () => {
  const [categories, setCategories] = React.useState<string[]>([]);

  React.useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  return (
    <Box sx={{ padding: { xs: 2, sm: 3, md: 5 } }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#364152', marginBottom: 3 }}>
        Categories
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {categories.map((category, index) => (
          <Grid item key={index} xs={12} sm={6} md={3} sx={{ mt: 0 }}>
            <Link href={`/productsbycategory?category=${category}`} passHref>
              <ButtonBase
                className="imageButton"
                focusRipple
                key={category}
                style={{
                  width: '100%',
                  borderRadius: '10px'
                }}
              >
                <span className="imageSrc" style={{ backgroundImage: `url(${categoryImages[category]})` }} />
                <span className="imageBackdrop" />
                <span className="image">
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    sx={{
                      position: 'relative',
                      p: 4,
                      pt: 2,
                      pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                    }}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                    <span className="imageMarked" />
                  </Typography>
                </span>
              </ButtonBase>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Categories;
