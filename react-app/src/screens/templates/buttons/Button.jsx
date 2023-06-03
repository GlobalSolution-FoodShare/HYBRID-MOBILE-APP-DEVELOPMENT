import React, {useState} from "react";
import { TouchableOpacity, StyleSheet, Text , View} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native'
import * as Font from 'expo-font';

const Button = ({ label, position, namePage }) => {

    const navigation = useNavigation();

    const handle = () => {
        navigation.navigate(namePage);
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
        return null; // Renderiza null enquanto as fontes estão sendo carregadas
    }
    
    return(
        <TouchableOpacity
            style={styles.button}
            onPress={handle}
        >
            <LinearGradient
                colors={['#C133FF', '#8E00CC']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.container, position]}
            >
                <Text style={styles.label}>{label}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        flex:0,
        width: 335,
        height: 51,
        borderRadius: 20,
        alignItems:'center',
        alignSelf: 'center',
    },
    backgroundGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontFamily: 'DMSans-Bold',
        fontStyle: 'normal',
        fontSize: 14,
        lineHeight: 47,
        textAlign:'center',
        color: '#fff',
    }

})

export default Button;