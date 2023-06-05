import React from 'react';

const AuthContext = React.createContext({
  token: null,
  cliente: {},
  signIn: () => {},
  logout: () => {}

});

export default AuthContext;