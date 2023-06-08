import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';

const TextAsButton = ({ label , positionStyle, namePage}) => {

  const navigation = useNavigation();

  const handle = () => {
    navigation.navigate(namePage)
  }

  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'DMSans-Bold': require('../../../fonts/DMSans-Bold.ttf'),
    });
    setFontsLoaded(true);
  };

  if (!fontsLoaded) {
    loadFonts();
    return null;
  }

  return (
    <TouchableOpacity 
      style={{justifyContent: 'center'}}
      onPress={handle}
    >
      <Text style={[styles.text, positionStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    text: {
        fontFamily: 'DMSans-Bold',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'right',
        letterSpacing: -0.01,
        color: '#B100FF',
    },
    
});

export default TextAsButton;
