import { View, Text, TextInput , StyleSheet} from 'react-native'
import React from 'react'

export default function Inputs({ label, value, onChangeText, placeholder, password, type, maxLength}) {
  return (
    <View>
        <Text style={styles.text}>{label}</Text>
        <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={'#AAACAE'}
            style={styles.input}
            secureTextEntry={password}
            keyboardType={type}
            maxLength={maxLength}
        >

        </TextInput>
    </View>
  )
}

const styles = StyleSheet.create({
    input:{
        width:334,
        height: 50,
        borderColor:'#DFE2E6',
        borderRadius: 15,
        borderWidth:2,
        alignSelf: 'center',
        margin: 15,
        paddingLeft: 20
    },
    text: {
        marginLeft:30,
        marginTop: 20
    }
})