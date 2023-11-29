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
import { AdminProvider } from './context/admin_context.jsx';
import { OrderProvider } from './context/order_context';
import { ContactProvider } from './context/contact_context.jsx';
import { WishlistProvider } from './context/wishlist_context.jsx';
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
        <AdminProvider>
          <ContactProvider>
            <CartProvider>
              <OrderProvider>
                <WishlistProvider>
                  <React.StrictMode>
                    <App />
                  </React.StrictMode>
                </WishlistProvider>
              </OrderProvider>
            </CartProvider>
          </ContactProvider>
        </AdminProvider>
      </FilterContextProvider>
    </AppProvider>
  </Auth0Provider>
)
