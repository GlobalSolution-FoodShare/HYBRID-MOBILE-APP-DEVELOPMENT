import React from 'react'
import { Image } from 'react-native'
import logo from '../../../../assets/logo.png'

export default function Logo() {
  return (
    <Image
        source={logo}
        style={{alignSelf:'center', marginTop: 20}}
    />
  )
}