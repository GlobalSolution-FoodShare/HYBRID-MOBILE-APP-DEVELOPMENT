import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AuthContext from '../../context/AuthContext';
import ApiService from '../../service/ApiService';
import LogadoContext from '../../context/LogadoContext';

export default function Home() {
  const { idCliente, token } = useContext(AuthContext);
  const { setClienteFunction, cliente } = useContext(LogadoContext);
  const [region, setRegion] = useState(null);
  const [clientesProximos, setClientesProximos] = useState([]);
  const [loading, setLoading] = useState(true);

  const logarCliente = async () => {
    const responseCliente = await ApiService.get(`cliente/${idCliente}`, token);
    setClienteFunction(responseCliente.data);

    console.log("Cliente Atual: " + cliente.id);
  };

  const buscarPorProximidade = async (raio = 10) => {
    if (cliente.endereco) {
      try {
        const responseCliente = await ApiService.get(`cliente/raio?latitude=${cliente.endereco?.latitude}&longitude=${cliente.endereco?.longitude}&raio=${raio}`, token);
        setClientesProximos(responseCliente.data);
      } catch (e) {
        console.error("Erro ao buscar clientes proximos", e);
      }
    }
  };

  useEffect(() => {
    const fetchDados = async () => {
      await logarCliente();
      setLoading(false);
    };
    fetchDados();
  }, []);

  useEffect(() => {
    if (cliente.endereco) {
      setRegion({
        latitude: cliente.endereco.latitude,
        longitude: cliente.endereco.longitude,
        latitudeDelta: 0.0300,
        longitudeDelta: 0.00500,
      });
      buscarPorProximidade(); // Chamar a função buscarPorProximidade novamente quando o cliente atual for atualizado
    }
  }, [cliente]);

  return (
    <View style={styles.viewMaster}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <MapView 
          style={styles.map}
          region={region}
        >
          {region && (
            <Marker
              coordinate={region}
              pinColor='red'
            />
          )}
          {clientesProximos.map(clienteProximo => (
            <Marker
              key={clienteProximo.id}
              coordinate={{
                latitude: clienteProximo.endereco.latitude,
                longitude: clienteProximo.endereco.longitude
              }}
              pinColor='orange'
            />
          ))}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  viewMaster: {
    marginLeft: 0,
    padding: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    marginLeft: 0,
    border: 0,
    width: Dimensions.get('window').width,
    height: 582,
  },
});
