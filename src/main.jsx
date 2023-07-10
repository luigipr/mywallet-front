import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ResetStyle from './style/ResetStyle'
import GlobalStyle from './style/GlobalStyle'
import {AuthProvider} from './contexts/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <ResetStyle />
    <GlobalStyle />
    <App />
    </AuthProvider>
  </React.StrictMode>
)
