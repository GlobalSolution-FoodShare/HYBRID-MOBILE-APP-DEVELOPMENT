import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Modal, ScrollView } from 'react-native';
import LottieView from 'lottie-react-native';
import GenericModal from "../../templates/modal/GenericModal";
import ApiService from "../../../service/ApiService";
import AuthContext from "../../../context/AuthContext";

const SelectClienteReceptor = ({ cliente, onCloseModal }) => {
    const { token, idCliente } = useContext(AuthContext);
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [selectedSolicitacaoProduto, setSelectedSolicitacaoProduto] = useState(null);
    const [isDonationConfirmed, setIsDonationConfirmed] = useState(false);

    const formataEndereco = (endereco) => {
        const enderecoFormatado = `${endereco?.logradouro}, ${endereco?.numero}, ${endereco?.complemento}, ${endereco?.bairro}`;
        return enderecoFormatado;
    };

    useEffect(() => {
        const buscarSolicitacoes = async () => {
            try {
                const responseSolicitacoes = await ApiService.get(
                    `solicitacoes/cliente=${cliente?.id}`,
                    token
                );
                console.log(responseSolicitacoes.data);
                setSolicitacoes(responseSolicitacoes?.data);
            } catch (e) { }
        };

        buscarSolicitacoes();
    }, [cliente?.id, token]);

    const handleDoar = (solicitacaoProduto) => {
        setSelectedSolicitacaoProduto(solicitacaoProduto);
        setShowConfirmationModal(true);
    };

    const handleConfirmarDoacao = async () => {
        try {
            const body = {
                cliente: idCliente,
                solicitacaoProduto: {
                    id: selectedSolicitacaoProduto.id,
                },
            };
            console.log(body);
            const response = await ApiService.post('doacoes', body, token);
            console.log(response);
            setShowConfirmationModal(false)
            setIsDonationConfirmed(true);
        } catch (error) {
            console.error('Erro ao confirmar doação:', error);
        }
    };

    useEffect(() => {
        if (isDonationConfirmed) {
            const timer = setTimeout(() => {
                setIsDonationConfirmed(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [isDonationConfirmed]);

    return (
        <View style={styles.viewMaster}>
            {cliente !== undefined && (
                <Modal visible={true} animationType="slide" transparent>
                    <GenericModal
                        title={cliente?.nomeCompleto}
                        onClose={onCloseModal}
                        body={
                            <>
                                <View style={{ marginBottom: 10 }}>
                                    <Text>{`Endereco: ${formataEndereco(cliente?.endereco)}`}</Text>
                                    <Text>{`Qtd itens doados: 0`}</Text>
                                </View>
                                <ScrollView style={styles.scrollView}>
                                    {solicitacoes.map((solicitacao) =>
                                        solicitacao.solicitacaoProduto.map((produto, index) => (
                                            <View key={index} style={styles.solicitacaoProdutoContainer}>
                                                <View style={styles.textContainer}>
                                                    <Text style={styles.text}>{`${produto.quantidade}x ${produto.produto.nome}`}</Text>
                                                    <Text style={styles.text}>{produto.produto.descricao}</Text>
                                                </View>
                                                <TouchableOpacity
                                                    style={[styles.buttonContainer, produto.jaFoiDoado && styles.disabledButtonContainer]}
                                                    disabled={produto.jaFoiDoado}
                                                    onPress={() => handleDoar(produto)}
                                                >
                                                    <Text style={styles.buttonText}>{produto.jaFoiDoado ? 'Doado' : 'Doar'}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        ))
                                    )}
                                </ScrollView>
                            </>
                        }
                        bottom={
                            <TouchableOpacity style={styles.closeButton} onPress={onCloseModal}>
                                <Text style={styles.closeButtonText}>Fechar</Text>
                            </TouchableOpacity>
                        }
                    />
                </Modal>
            )}
            {showConfirmationModal && (
                <Modal visible={true} animationType="slide" transparent>
                    <GenericModal
                        title="Confirmar Doação"
                        body={
                            <Text>Tem certeza de que deseja confirmar a doação?</Text>
                        }
                        onClose={() => setShowConfirmationModal(false)}
                        bottom={
                            <View style={styles.modalButtonContainer}>
                                <TouchableOpacity
                                    style={[styles.modalButton, styles.modalButtonCancelar]}
                                    onPress={() => setShowConfirmationModal(false)}
                                >
                                    <Text style={styles.modalButtonText}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.modalButton, styles.modalButtonConfirmar]}
                                    onPress={handleConfirmarDoacao}
                                >
                                    <Text style={styles.modalButtonText}>Confirmar</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    />
                </Modal>
            )}
            {isDonationConfirmed && (
                <View style={styles.animationContainer}>
                    <LottieView
                        source={require('./../../../../assets/gif.gif')}
                        autoPlay
                        loop={false}
                        style={styles.animation}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    viewMaster: {},
    scrollView: {
        marginBottom: 10,
    },
    solicitacaoProdutoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: 'black',
        borderWidth: 0.6,
        marginVertical: 10,
        marginTop: 2,
        padding: 10,
        borderRadius: 10,
    },
    textContainer: {
        flex: 1,
    },
    text: {
        marginBottom: 10,
    },
    buttonContainer: {
        marginLeft: 10,
        backgroundColor: '#C133FF',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    disabledButtonContainer: {
        backgroundColor: 'gray',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    closeButton: {
        backgroundColor: '#C133FF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
    modalButtonContainer: {
        flexDirection: 'row',
    },
    animationContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animation: {
        width: 200,
        height: 200,
    },
});

export default SelectClienteReceptor;
