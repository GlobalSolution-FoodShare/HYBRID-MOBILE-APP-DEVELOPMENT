import React, { useState } from 'react';
import CadastroContext from './CadastroContext';

const CadastroProvider = ({ children }) => {
  const [cadastroInfo, setCadastroInfo] = useState({});

  return (
    <CadastroContext.Provider value={{ cadastroInfo, setCadastroInfo }}>
      {children}
    </CadastroContext.Provider>
  );
};

export default CadastroProvider;
