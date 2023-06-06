import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LogadoContext from '../../context/LogadoContext';

const HeaderTab = () => {
    const { cliente } = useContext(LogadoContext);

    const formataEndereco = (endereco) => {
        const enderecoFormatado = `${endereco?.logradouro}, ${endereco?.numero}, ${endereco?.complemento}, ${endereco?.bairro}`;
        return enderecoFormatado;
    }


    console.log(cliente)
    return (
        <View style={styles.headerContainer}>

            <View style={styles.headerContainerTextsInfos}>
                <Text style={styles.headerText}>{cliente?.perfil}</Text>
                <Text style={styles.subText}>{formataEndereco(cliente.endereco)}</Text>
            </View>

            <View>
                <Text style={styles.textSuper}>Veja as opções</Text>
                <Text style={styles.textMini}>Selecione um receptor para doar</Text>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#f8f8f8'
    },
    headerContainerTextsInfos: {
        backgroundColor: '#f8f8f8',
        padding: 10,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    subText: {
        color: '#B100FF',
        fontSize: 12,
        fontWeight: '300',
    },
    textSuper: {
        fontSize: 25,
        marginLeft: 15,
        fontWeight: 'bold',
    },
    textMini: {
        fontSize: 15,
        fontWeight: '400',
        marginLeft: 15,
        marginTop: 10,
        marginBottom: 15
    }
});

export default HeaderTab;
