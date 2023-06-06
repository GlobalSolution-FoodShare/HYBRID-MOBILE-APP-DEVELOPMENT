import React from 'react';

const LogadoContext = React.createContext({
    // inicializando com valores padrão
    mapa: {},
    pedidos: [{}],
    perfil: {},
    cliente: {},
    setClienteFunction: () => { },
    setPedidoFunction: () => { },
    setMapaFunction: () => { },
    setPerfilFunction: () => { },
    cleanContext: () => { }
});

export default LogadoContext;