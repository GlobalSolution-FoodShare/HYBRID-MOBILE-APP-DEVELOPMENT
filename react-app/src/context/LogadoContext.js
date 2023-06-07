import React from 'react';

const LogadoContext = React.createContext({
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