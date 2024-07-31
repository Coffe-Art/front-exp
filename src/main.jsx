import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from '../src/Context/contextAuth.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
        <App />
    </AuthProvider>
)
