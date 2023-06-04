import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Inputs from '../templates/buttons/Inputs'
import Logo from '../templates/img/Logo'
import SpanBold from '../templates/text/SpanBold'

export default function Endereco() {
  return (
    <View>
        <Logo/>
        <SpanBold
            label="Crie uma conta"
            positionStyle={styles.positionCriaConta}
        />
        <Text style={styles.text}>Conta pra gente onde você mora</Text>

        <Inputs
            label="Digite seu Endereço"
            placeholder="Sant"
        />
    </View>
  )
}

const styles = StyleSheet.create({
    positionCriaConta:{
        alignSelf: 'flex-start',
        marginTop: 30,
        marginLeft:10
    },
    text:{
        marginLeft: 30,
        marginTop: 20
    }
});