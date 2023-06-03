import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import logo from '../../../assets/logo.png'
import Inputs from '../templates/buttons/Inputs';
import Button from '../templates/buttons/Button';
import TextAsButton from '../templates/buttons/TextAsButton';


export default function Login() {

    const navigation = useNavigation();

    const handleBack = () => {
        navigation.navigate('Init')
    }

  return (
    <View>
        <TouchableOpacity
            onPress={handleBack}
        >
            <Image
                source={logo}
                style={{marginLeft: 18}}
            />
            <Text>Food Share</Text>
        </TouchableOpacity>
        <Inputs
            label="Email"
            placeholder="Email"
        />
        <Inputs
            label="Senha"
            placeholder="Senha"
            password={true}
        />
        <Button
            label = "Login"
            namePage="Home"
            position={styles.positionCadastro}
        />
        <TextAsButton
            label="Crie uma conta"
            namePage="Cadastro"
            positionStyle={styles.positionEsqueciSenha}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    positionCadastro: {
        marginTop: 50
    },
    positionEsqueciSenha: {
        marginTop:35,
        marginRight: 135
    }
})