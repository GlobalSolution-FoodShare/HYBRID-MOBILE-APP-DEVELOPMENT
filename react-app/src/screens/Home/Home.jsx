import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View, ActivityIndicator, Image, TouchableOpacity, Modal, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AuthContext from '../../context/AuthContext';
import ApiService from '../../service/ApiService';
import LogadoContext from '../../context/LogadoContext';
import { MaterialIcons } from '@expo/vector-icons';
import customMaker from './../../../assets/iconLocal.png';
import GenericModal from '../templates/modal/GenericModal';

export default function Home() {
  const { idCliente, token } = useContext(AuthContext);
  const { setClienteFunction, cliente } = useContext(LogadoContext);
  const [region, setRegion] = useState(null);
  const [clientesProximos, setClientesProximos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCliente, setSelectedCliente] = useState(null); // Estado para controlar o cliente selecionado

  useEffect(() => {
    const logarCliente = async () => {
      try {
        const responseCliente = await ApiService.get(`cliente/${idCliente}`, token);
        setClienteFunction(responseCliente.data);
      } catch (e) {
      }
    };

    logarCliente();
  }, [idCliente, token, setClienteFunction]);

  useEffect(() => {
    const buscarPorProximidade = async (raio = 10) => {
      if (cliente?.endereco) {
        try {
          const responseCliente = await ApiService.get(`cliente/raio?latitude=${cliente.endereco.latitude}&longitude=${cliente.endereco.longitude}&raio=${raio}`, token);
          setClientesProximos(responseCliente.data);
        } catch (e) {
          console.log("Erro ao buscar clientes proximos", e);
        }
      }
    };

    if (cliente?.endereco) {
      setRegion({
        latitude: cliente.endereco.latitude,
        longitude: cliente.endereco.longitude,
        latitudeDelta: 0.0300,
        longitudeDelta: 0.00500,
      });

      buscarPorProximidade();
    }

    setLoading(false);
  }, [cliente, token]);

  const centralizarCliente = () => {
    if (region) {
      setRegion({
        ...region,
        latitudeDelta: 0.0300,
        longitudeDelta: 0.00500,
      });
    }
  };

  const handleClientePress = (cliente) => {
    setSelectedCliente(cliente);
  };

  const closeModal = () => {
    setSelectedCliente(null);
  };

  return (
    <View style={styles.viewMaster}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <MapView
            style={styles.map}
            region={region}
          >
            {region && (
              <Marker coordinate={region}>
                <Image source={require('./../../../assets/iconLocal.png')} />
              </Marker>
            )}
            {clientesProximos.map(clienteProximo => (
              <Marker
                key={clienteProximo.id}
                coordinate={{
                  latitude: clienteProximo.endereco.latitude,
                  longitude: clienteProximo.endereco.longitude
                }}
                onPress={() => handleClientePress(clienteProximo)}
              >
                <Image source={require('./../../../assets/iconLocalReceptor.png')} />
              </Marker>
            ))}
          </MapView>
          <TouchableOpacity style={styles.buttonContainer} onPress={centralizarCliente}>
            <MaterialIcons name="my-location" size={24} color="#C133FF" />
          </TouchableOpacity>

          {/* Modal */}
          <Modal visible={selectedCliente !== null} animationType="slide">
            <GenericModal
              title={selectedCliente?.nome}
              onClose={closeModal}
              body={
                <Text>Conteúdo do corpo do modal para o cliente selecionado</Text>
              }
              bottom={
                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                  <Text style={styles.closeButtonText}>Fechar</Text>
                </TouchableOpacity>
              }
            />
          </Modal>
        </>
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
    position: 'absolute',
    marginLeft: 0,
    padding: 10,
    bottom: 10,
    marginBottom: 9,
    border: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#33213',
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#C133FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
