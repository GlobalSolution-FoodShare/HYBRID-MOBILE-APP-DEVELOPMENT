import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ListSolicitacoes = ({ solicitacoes }) => {

    // console.log(solicitacoes)
    return (
        <>
            {solicitacoes.map((solicitacao) => (
                <ListSolicitacoesItem key={solicitacao.id} solicitacao={solicitacao} />
            ))}
        </>
    );
};

const ListSolicitacoesItem = ({ solicitacao }) => {
    const { solicitacaoProduto } = solicitacao;

    return (
        <View style={styles.container}>
            {solicitacaoProduto.map((produto, index) => (
                <View key={index} style={styles.textContainer}>
                    <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
                        {produto.quantidade}x {produto.produto.nome}
                    </Text>
                    <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
                        {produto.produto.descricao}
                    </Text>
                </View>
            ))}
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => console.log("Doar")}
            >
                <Text style={styles.buttonText}>Doar</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        borderColor: "black",
        borderWidth: 0.6,
        marginVertical: 10,
        marginTop: 2,
        padding: 10,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    textContainer: {
        flex: 1,
    },
    text: {
        marginBottom: 10,
    },
    buttonContainer: {
        marginLeft: 10,
        backgroundColor: "#C133FF",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
    },
});

export default ListSolicitacoes;
