import { View, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import SpanBold from '../templates/text/SpanBold'
import CardPerfil from '../templates/cardperfil/CardPerfil'

export default function Perfil() {

    return (
        <View>
            <SpanBold
                label="Meu Perfil"
                positionStyle={styles.positionPerfil}
            />
            <View style={styles.viewMaster}>
                <CardPerfil />
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