import React, { useContext, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import TextAsButton from '../templates/buttons/TextAsButton.jsx'
import CarouselLogin from './CarouselLogin.jsx'
import Button from '../templates/buttons/Button.jsx'
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../context/AuthContext.js'


export default function Login() {
  const navigation = useNavigation();

  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      navigation.navigate('Home')
    }
  }, [token]);

  return (
    <>
      <TextAsButton
        label="Pular"
        positionStyle={styles.positionPular}
        namePage="Login"
      />
      <CarouselLogin />
      <Button
        onPress={() => navigation.navigate("Cadastro")}
        label="Crie uma conta"
        position={styles.positionButton}
        namePage="Cadastro"
      />
      <TextAsButton
        label="Login"
        positionStyle={styles.positionLogin}
        namePage="Login"
      />
    </>
  )
}

const styles = StyleSheet.create({
  positionPular: {
    marginLeft: 39,
    marginTop: 24,
  },
  positionButton: {
    marginTop: 40
  },
  positionLogin: {
    marginRight: '44%',
    marginTop: 40
  }
});