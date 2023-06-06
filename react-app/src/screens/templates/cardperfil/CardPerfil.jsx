import { View, StyleSheet, Image, Text } from 'react-native'
import React, {useState, useEffect} from 'react'
import photoPerfil from '../../../../assets/barbudo.png'

export default function CardPerfil({ nomeCompleto }) {

  return (
    <View style={styles.cardPerfil}>
        <View style={styles.viewPerfil}>
            <Image
                source={photoPerfil}
            />
        </View>
        <View style={styles.infoCard}>
            <Text style={styles.name}>{nomeCompleto}</Text>
            <Text numberOfLines={2} style={styles.email}>rm94067@fiap.com.br</Text>
            <View style={styles.line}/>
            <Text style={styles.email}>(11)930637477</Text>
            <View style={styles.line}/>
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
        paddingVertical:20,
        display:'flex',
        flexDirection:'row',
    },
    viewPerfil:{
        justifyContent:'center'
    },
    infoCard: {
        display:'flex',
        flexDirection:'column'
    },
    name:{
        lineHeight:25,
        fontSize:18,
        maxWidth: 200,
        fontWeight:500
    },
    email:{
        fontSize:15,
        lineHeight:20,
        fontWeight:400,
        color:"#000",
        opacity:0.5
    },
    line:{
        borderBottomColor: 'black',
        opacity:0.5,
        borderBottomWidth: 1,
        marginVertical: 10,
        marginTop:2
    }
})