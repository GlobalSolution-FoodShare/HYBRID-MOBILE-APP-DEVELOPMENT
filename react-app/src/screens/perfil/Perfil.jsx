import { View, StyleSheet, Dimensions } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import SpanBold from '../templates/text/SpanBold'
import CardPerfil from '../templates/cardperfil/CardPerfil'
import AuthContext from '../../context/AuthContext';
import ApiService from '../../service/ApiService';
import LogadoContext from '../../context/LogadoContext';

export default function Perfil() {

    const { idCliente, token } = useContext(AuthContext);
    const { setClienteFunction, cliente } = useContext(LogadoContext);



    return (
        <View>
            <SpanBold
                label="Meu Perfil"
                positionStyle={styles.positionPerfil}
            />
            <View style={styles.viewMaster}>
                <CardPerfil
                    nomeCompleto={cliente.nomeCompleto}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    positionPerfil: {
        alignSelf: 'flex-start',
        marginTop: 20,
        marginLeft: 20,
        color: '#323643'
    },
    viewMaster: {
        marginTop: 20,
        width: '100%',
        height: Dimensions.get('window').height,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderWidth: 2,
        borderColor: '#E0E0E0',
        padding: 35,
    }
})