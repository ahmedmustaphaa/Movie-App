import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { ClerkProvider } from '@clerk/clerk-react';
import Appcontext from '../context/Appcontext.jsx';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

createRoot(document.getElementById('root')).render(
 <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
  <BrowserRouter>
    <Appcontext>
      <App />
    </Appcontext>
  </BrowserRouter>
</ClerkProvider>
);
