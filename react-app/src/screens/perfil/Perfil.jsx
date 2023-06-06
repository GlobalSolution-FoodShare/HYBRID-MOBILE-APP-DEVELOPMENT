import React, { useContext } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import CardPerfil from '../templates/cardperfil/CardPerfil';
import AuthContext from '../../context/AuthContext';
import LogadoContext from '../../context/LogadoContext';
import Button from '../templates/buttons/Button';

export default function Perfil() {
    const { cliente } = useContext(LogadoContext);
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <View style={styles.container}>
            <View style={styles.viewMaster}>
                <CardPerfil cliente={cliente} />
                <View style={styles.buttonContainer}>
                    <Button label="Sair" textStyle={styles.buttonText} onPress={handleLogout} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewMaster: {
        flex: 1,
        padding: 25,
        justifyContent: 'space-between',
    },
    buttonContainer: {
        alignSelf: 'stretch',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
