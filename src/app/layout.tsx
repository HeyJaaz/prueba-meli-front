'use client';

import * as React from 'react';
import Sidebar from '@/components/sidebar/sidebar';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Test MELI</title>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
    </head>
    <body>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Sidebar>{children}</Sidebar>
      </ThemeProvider>
    </body>
    </html>
  );
};

export default MainLayout;
