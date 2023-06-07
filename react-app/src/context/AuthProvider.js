import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from './AuthContext';
import ApiService from '../service/ApiService';

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [idCliente, setIdCliente] = useState(null);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('@RNAuth:token');
      const storedIdCliente = await AsyncStorage.getItem('@RNAuth:idCliente');
      if (storedIdCliente && storedToken) {
        try {
          const response = await ApiService.get('validar-token', storedToken);
          setIdCliente(storedIdCliente)
          setToken(storedToken);
          console.info("Sucesso na revalidação")
        } catch (error) {
          setToken(null);
          setIdCliente(null);
          return false;
        }
      } else {
        setToken(null);
        setIdCliente(null);
      }

    } catch (error) {
      console.log('Erro ao recuperar o token:', error);
    }

  };

  const signIn = async (data) => {
    try {
      const response = await ApiService.post('login', data);

      setToken(response.token);
      setIdCliente(response.cliente);


      await AsyncStorage.setItem('@RNAuth:token', response.token);
      await AsyncStorage.setItem('@RNAuth:idCliente', response.cliente.toString());

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };


  const logout = async () => {
    setToken(null);
    await AsyncStorage.removeItem('@RNAuth:token');
    await AsyncStorage.removeItem('@RNAuth:idCliente');
  };

  return (
    <AuthContext.Provider value={{ token, signIn, logout, idCliente }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
