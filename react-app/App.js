import React from 'react';
import { StatusBar, Platform } from 'react-native';
import AuthProvider from './src/context/AuthProvider.js';
import CadastroProvider from './src/context/CadastroProvider.js';
import Routes from './src/routes/Routes.js';


export default function App() {
  return (
    <AuthProvider>
      <CadastroProvider>
        <StatusBar
          backgroundColor="#B100FF"
          barStyle={Platform.OS === 'android' ? 'white-content' : 'default'}
        />
        <Routes />
      </CadastroProvider>
    </AuthProvider>
  );
}