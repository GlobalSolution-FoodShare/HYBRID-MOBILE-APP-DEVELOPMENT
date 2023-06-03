import React from 'react'
import { StyleSheet, View , Text} from 'react-native'
import Inputs from '../templates/buttons/Inputs'
import Logo from '../templates/img/Logo'
import SpanBold from '../templates/text/SpanBold'

export default function Cadastro() {
  return (
    <View>
        <Logo/>
        <SpanBold
            label="Crie uma conta"
            positionStyle={styles.positionCriaConta}
        />
        <Text style={styles.text}>Fale mais sobre você</Text>
        <Inputs
            label="CPF"
            placeholder="CPF"
            type="decimal-pad"
            maxLength={11}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    positionCriaConta:{
        alignSelf: 'flex-start',
        marginTop: 20,
        marginLeft:10
    },
    text:{
        marginLeft: 30,
        marginTop: 20
    }
})