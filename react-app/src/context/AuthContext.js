import React from 'react';

const AuthContext = React.createContext({
  token: null,
  idCliente: null,
  signIn: () => {},
  logout: () => {}

});

export default AuthContext;