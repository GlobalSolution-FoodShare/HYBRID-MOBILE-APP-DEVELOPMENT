import React, { useContext, useEffect, useState, useRef } from 'react';
import { Dimensions, StyleSheet, View, ActivityIndicator, Image, TouchableOpacity, Modal, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AuthContext from '../../context/AuthContext';
import ApiService from '../../service/ApiService';
import LogadoContext from '../../context/LogadoContext';
import { MaterialIcons } from '@expo/vector-icons';
import GenericModal from '../templates/modal/GenericModal'
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';

export default function Home() {
  const { idCliente, token } = useContext(AuthContext);
  const { setClienteFunction, cliente } = useContext(LogadoContext);
  const [region, setRegion] = useState(null);
  const [clientesProximos, setClientesProximos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const mapViewRef = useRef(null);
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [raio, setRaio] = useState(10)

  const [sliderVisible, setSliderVisible] = useState(false);
  const [selectedDistance, setSelectedDistance] = useState(null);

  const toggleSliderVisibility = () => {
    setSliderVisible(!sliderVisible);
  };

  const handleSliderValueChange = (value) => {
    setRaio(value);
    setSelectedDistance(value);
  };

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
    const buscarPorProximidade = async () => {
      if (cliente?.endereco) {
        setSelectedDistance(raio)
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

      if (cliente.perfil == 'DOADOR') {
        buscarPorProximidade();
      }
    }

    setLoading(false);
  }, [cliente, token, raio]);

  const centralizarCliente = () => {
    if (region && region.latitude && region.longitude && mapViewRef.current) {
      mapViewRef.current.animateToRegion({
        ...region,
        // latitudeDelta: 0.0300,
        // longitudeDelta: 0.00500,
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
        <ActivityIndicator size="large" color="#C133FF" />
      ) : (
        <>
          <MapView
            ref={mapViewRef}
            style={styles.map}
            region={region}
          >
            {region && (
              <Marker
                coordinate={region}
              >
                <Image
                  source={require('./../../../assets/iconLocal.png')}
                />
              </Marker>
            )}
            {clientesProximos.map(clienteProximo => (
              <Marker
                key={clienteProximo.id}
                coordinate={{
                  latitude: clienteProximo.endereco.latitude,
                  longitude: clienteProximo.endereco.longitude
                }}
                onPress={() => handleClientePress(clienteProximo)} // Manipulador de evento para quando o marcador do cliente for pressionado
              >
                <Image
                  source={require('./../../../assets/iconLocalReceptor.png')}
                />
              </Marker>
            ))}
          </MapView>
          <TouchableOpacity style={styles.buttonContainer} onPress={centralizarCliente}>
            <MaterialIcons name="my-location" size={24} color="#C133FF" />
          </TouchableOpacity>


          {cliente?.perfil === "RECEPTOR" && (
            <TouchableOpacity style={styles.addButton} onPress={() => { /* Função do clique aqui */ }}>
              <LinearGradient
                colors={['#C133FF', '#8E00CC']}
                style={styles.gradientButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 11, y: 1 }}
              >
                <MaterialIcons name="add" size={30} color="white" />
              </LinearGradient>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.filterButton} onPress={toggleSliderVisibility}>
            <MaterialIcons name="tune" size={24} color="#C133FF" />
          </TouchableOpacity>

          {sliderVisible && (
            <View style={styles.filterContainer}>
              <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={50}
                step={1}
                value={raio}
                onValueChange={handleSliderValueChange}
                minimumTrackTintColor="#C133FF"
                thumbTintColor="#FF00FF" 
              />
              {selectedDistance && (
                <Text style={{ textAlign: 'center' }}>{`${selectedDistance} KM`}</Text>
              )}
            </View>
          )}



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
    bottom: -6,
    marginBottom: 9,
    border: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 25,
    left: 5,
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
  addButton: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    width: 45,
    height: 45,
    borderRadius: 28,
    overflow: 'hidden',
  },

  gradientButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButton: {
    position: 'absolute',
    top: 10,
    right: 15,
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    position: 'absolute',
    top: 85,
    right: 25,
    width: 200,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    padding: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
});