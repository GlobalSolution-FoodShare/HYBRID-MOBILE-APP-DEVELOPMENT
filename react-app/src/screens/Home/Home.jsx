import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, {useContext} from 'react'
import MapView, { Marker } from 'react-native-maps'
import AuthContext from '../../context/AuthContext';
import ApiService from '../../service/ApiService';

export default function Home() {
  const { idCliente, token } = useContext(AuthContext);

  const logarCliente = () => {

  }


  return (
    <View style={styles.viewMaster}>
      <MapView style={styles.map}>
        <Marker
          coordinate={{
            latitude: -23.574096131033418,
            longitude: -46.62322686358335
          }}
        />
        <Marker
          coordinate={{
            latitude: -23.461177840386124,
            longitude: -46.52901510405996
          }}
        />
      </MapView>
    </View>
  )
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

  }
})