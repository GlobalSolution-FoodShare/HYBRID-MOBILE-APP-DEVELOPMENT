import React, { useContext, useEffect, useState, useRef } from 'react';
import { Dimensions, StyleSheet, View, ActivityIndicator, Image, TouchableOpacity, ScrollView, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AuthContext from '../../context/AuthContext';
import ApiService from '../../service/ApiService';
import LogadoContext from '../../context/LogadoContext';
import { MaterialIcons } from '@expo/vector-icons';
import GenericModal from '../templates/modal/GenericModal'
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';
import { BlurView } from '@react-native-community/blur';
import ListSolicitacoes from './listSolicitacoes/ListSolicitacoes';
import SelectClienteReceptor from './selectClienteReceptor/SelectClienteReceptor';

export default function Home() {
  const { idCliente, token } = useContext(AuthContext);
  const { setClienteFunction, cliente } = useContext(LogadoContext);
  const [region, setRegion] = useState(null);
  const [clientesProximos, setClientesProximos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const mapViewRef = useRef(null);
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [raio, setRaio] = useState(10);

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

      if (cliente.perfil === 'DOADOR') {
        buscarPorProximidade();
      }
    }

    setLoading(false);
  }, [cliente, token, raio]);

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
  };

  const closeModal = () => {
    setSelectedMarker(null);
  };

  const centralizarCliente = () => {
    if (region && region.latitude && region.longitude && mapViewRef.current) {
      mapViewRef.current.animateToRegion({
        ...region,
      });
    }
  };

  const toggleSliderVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleSliderValueChange = (value) => {
    setRaio(value);
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
            showsUserLocation={true}
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
            {clientesProximos.map((clienteProximo) => (
              <Marker
                key={clienteProximo.id}
                coordinate={{
                  latitude: clienteProximo.endereco.latitude,
                  longitude: clienteProximo.endereco.longitude
                }}
                onPress={() => handleMarkerPress(clienteProximo)}
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

          <TouchableOpacity style={styles.filterButton} onPress={toggleSliderVisibility}>
            <MaterialIcons name="tune" size={24} color="#C133FF" />
          </TouchableOpacity>

          {isFilterVisible && (
            <View style={styles.filterContainer}>
              <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={250}
                step={1}
                value={raio}
                onValueChange={handleSliderValueChange}
                minimumTrackTintColor="#C133FF"
                thumbTintColor="#FF00FF"
              />
              <Text style={{ textAlign: 'center', marginTop: -15, color: '#C133FF' }}>{`${raio} KM`}</Text>
            </View>
          )}

          {selectedMarker && (
            <SelectClienteReceptor cliente={selectedMarker} onCloseModal={closeModal} />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  viewMaster: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 25,
    left: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  filterButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  filterContainer: {
    position: 'absolute',
    top: 70,
    right: 15,
    width: 200,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    padding: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  slider: {
    width: '100%',
    height: 40,
  },
});