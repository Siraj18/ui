import React from 'react';
import "@fontsource/jetbrains-mono";
import "@fontsource/montserrat";
import App from './App';
import theme from './theme';
import { ChakraProvider } from '@chakra-ui/react'

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript



root.render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </Provider>

);


