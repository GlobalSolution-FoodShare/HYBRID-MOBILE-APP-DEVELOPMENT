import { View, StyleSheet, Dimensions } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import SpanBold from '../templates/text/SpanBold'
import CardPerfil from '../templates/cardperfil/CardPerfil'
import AuthContext from '../../context/AuthContext';
import ApiService from '../../service/ApiService';
import LogadoContext from '../../context/LogadoContext';

export default function Perfil() {

    const { idCliente, token } = useContext(AuthContext);
    const { setClienteFunction, cliente } = useContext(LogadoContext);

    const logarCliente = async () => {
        const responseCliente = await ApiService.get(`cliente/${idCliente}`, token);
        setClienteFunction(responseCliente.data);
    
        console.log("Cliente Atual: " + cliente.id);
    };

    useEffect(() => {
        const fetchDados = async () => {
          await logarCliente();
          setLoading(false);
        };
        fetchDados();
    }, []);

    const [nomeCompleto, setNomeCompleto] = useState('');

    useEffect(() => {
    
        const fetchCliente = async () => {
        try {
            const response = await fetch('http://192.168.0.145:8080/api/cliente/1');
            const cliente = await response.json();
            setNomeCompleto(cliente.nomeCompleto);
        } catch (error) {
            console.error(error);
        }
        };

        fetchCliente();
    }, []);


  return (
    <View>
        <SpanBold
            label="Meu Perfil"
            positionStyle={styles.positionPerfil}
        />
        <View style={styles.viewMaster}>
            <CardPerfil
                nomeCompleto={nomeCompleto}
            />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    positionPerfil:{
        alignSelf:'flex-start',
        marginTop:20,
        marginLeft:20,
        color:'#323643'
    },
    viewMaster:{
        marginTop:20,
        width:'100%',
        height:Dimensions.get('window').height,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        borderWidth:2,
        borderColor:'#E0E0E0',
        padding:35,
    }
})