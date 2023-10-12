import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { AppProvider } from './context/productcontext';
import { FilterContextProvider } from './context/filtercontext';
import { CartProvider } from './context/cart_context';
import { OrderProvider } from './context/order_context';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-xeacd5a284zqvwvp.us.auth0.com"
    clientId="AGoiAcxWjnqHKcOWf5xSFnJ98Bvau4Of"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <AppProvider>
      <FilterContextProvider>
        <CartProvider>
          <OrderProvider>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </OrderProvider>
        </CartProvider>
      </FilterContextProvider>
    </AppProvider>
  </Auth0Provider>
)
