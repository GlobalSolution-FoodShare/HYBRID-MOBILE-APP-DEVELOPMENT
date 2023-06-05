import React from 'react';

const AuthContext = React.createContext({
  token: null,
  signIn: () => {},
  logout: () => {}

});

export default AuthContext;