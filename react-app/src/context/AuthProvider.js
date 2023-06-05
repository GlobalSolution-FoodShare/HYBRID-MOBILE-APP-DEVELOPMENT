import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from './AuthContext';
import ApiService from '../service/ApiService';

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('@RNAuth:token');
      if (storedToken) {
        setToken(storedToken);
      }
    } catch (error) {
      console.log('Erro ao recuperar o token:', error);
    }
  };

  const signIn = async (data) => {
    try {
      const response = await ApiService.post('login', data);


      setToken(response.token);

      await AsyncStorage.setItem('@RNAuth:token', response.token);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };


  const logout = async () => {
    setToken(null);
    // Remover o token do AsyncStorage
    await AsyncStorage.removeItem('@RNAuth:token');
  };

  return (
    <AuthContext.Provider value={{ token, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
