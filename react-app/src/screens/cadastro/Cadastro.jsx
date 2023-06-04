import React , { useState, useRef } from 'react'
import { StyleSheet, View , Text, Touchable, TouchableOpacity} from 'react-native'
import Inputs from '../templates/buttons/Inputs'
import Logo from '../templates/img/Logo'
import SpanBold from '../templates/text/SpanBold'
import CustomPicker from '../templates/buttons/CustomPicker'
import Button from '../templates/buttons/Button.jsx'



export default function Cadastro() {

    const optionsPicker = ['Doador', 'Receptor'];

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

        <Inputs
            label="Nome Completo"
            placeholder="Nome Completo"
        />

        <Text style={styles.text}>Doador ou Receptor</Text>

        <CustomPicker
            options={optionsPicker}
        />

        {/* <Button
            label="Próxima Etapa"
            position={styles.positionNextStep}
            namePage="Endereco"
        /> */}

            
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
    },
    positionNextStep:{
        marginTop:270,
        width: 335,
        height: 51,
    }
})