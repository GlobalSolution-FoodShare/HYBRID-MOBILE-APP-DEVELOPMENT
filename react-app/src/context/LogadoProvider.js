import React, { useState } from 'react';
import LogadoContext from './LogadoContext';

const LogadoProvider = ({ children }) => {
    const [mapa, setMapa] = useState({});
    const [pedidos, setPedidos] = useState([]);
    const [perfil, setPerfil] = useState({});
    const [cliente, setCliente] = useState({});


    const setClienteFunction = (cliente) => {
        setCliente(cliente)
    }
    const setPedidoFunction = (pedido) => {
        setPedidos(pedido)
    }

    const setMapaFunction = (mapa) => {
        setMapa(mapa)
    }

    const setPerfilFunction = (perfil) => {
        setMapa(perfil)
    }

    const cleanContext = () => {
        setCliente({})
        setMapa({})
        setPerfil({})
        setPedidos({})
    }


    return (
        <LogadoContext.Provider value={{ mapa, pedidos, perfil, cliente, setClienteFunction, setPedidoFunction, setMapaFunction, setPerfilFunction, cleanContext }}>
            {children}
        </LogadoContext.Provider>
    );
};

export default LogadoProvider;