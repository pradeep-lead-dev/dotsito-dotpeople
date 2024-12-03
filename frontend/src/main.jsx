import React from 'react';
import ReactDOM from 'react-dom/client'; // Import createRoot from react-dom/client
import App from './App';
import { AuthProvider } from './contexts/AuthContext.jsx';


const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement); // Use createRoot instead of ReactDOM.render

root.render(
  <React.StrictMode>
    <AuthProvider>
    <App />
     
    </AuthProvider>
    
  </React.StrictMode>
);
