import { View, StyleSheet, Image, Text } from 'react-native'
import React, {useState, useEffect} from 'react'
import photoPerfil from '../../../../assets/barbudo.png'

export default function CardPerfil() {

    const [nomeCompleto, setNomeCompleto] = useState('');

    useEffect(() => {
    
        const fetchCliente = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/cliente/1');
            const cliente = await response.json();
            setNomeCompleto(cliente.nomeCompleto);
        } catch (error) {
            console.error(error);
        }
        };

        fetchCliente();
    }, []);

  return (
    <View style={styles.cardPerfil}>
        <View style={styles.viewPerfil}>
            <Image
                source={photoPerfil}
            />
        </View>
        <View style={styles.infoCard}>
            <Text>{nomeCompleto}</Text>
            <Text>Sla</Text>
            <Text>Sla</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({

    cardPerfil: {
        width:'100%',
        height:162,
        borderRadius:25,
        borderWidth:2,
        borderColor:'#CBCBCB',
        padding:5,
        display:'flex',
        flexDirection:'row',
    },
    viewPerfil:{
        justifyContent:'center'
    },
    infoCard: {
        display:'flex',
        flexDirection:'column'
    }
})