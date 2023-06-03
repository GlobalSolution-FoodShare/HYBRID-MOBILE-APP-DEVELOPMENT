import React from 'react'
import { View, StyleSheet} from 'react-native'
import TextAsButton from '../templates/buttons/TextAsButton.jsx'
import CarouselLogin from './CarouselLogin.jsx'
import Button from '../templates/buttons/Button.jsx'



export default function Login() {
  return (
    <>
      <TextAsButton 
        label="Pular" 
        positionStyle={styles.positionPular}
        namePage="Login"
      />
      <View styles={{flex:1}}>
        <CarouselLogin/>
      </View>
      <Button 
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
    positionPular:{
      marginLeft: 39,
      marginTop: 24,
    },
    positionButton: {
      marginTop: 40
    },
    positionLogin:{
      marginRight:'44%',
      marginTop:40
    }
  });