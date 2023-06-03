import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import * as Font from 'expo-font';

const SpanBold = ({ label , positionStyle}) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'DMSans-Bold': require('../../../fonts/DMSans-Bold.ttf'),
    });
    setFontsLoaded(true);
  };

  if (!fontsLoaded) {
    loadFonts();
    return null; // Renderiza null enquanto as fontes estão sendo carregadas
  }

  return (<Text style={[styles.mySpanBold, positionStyle]}>{label}</Text>);
};

const styles = StyleSheet.create({
    mySpanBold: {
        fontFamily: 'DMSans-Bold',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 24,
        lineHeight: 31,
        textAlign: 'center',
        letterSpacing: -0.03,
        color: '#1C1C1C',
    },
});

export default SpanBold;
