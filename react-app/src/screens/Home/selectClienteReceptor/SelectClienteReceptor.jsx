import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, TouchableOpacity, Text, ScrollView, Modal, ActivityIndicator } from 'react-native';
import LottieView from 'lottie-react-native';
import GenericModal from "../../templates/modal/GenericModal";
import ApiService from "../../../service/ApiService";
import Button from "../../templates/buttons/Button";
import AuthContext from "../../../context/AuthContext";

const SelectClienteReceptor = ({ cliente, onCloseModal }) => {
    const { token, idCliente } = useContext(AuthContext);
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [selectedSolicitacaoProduto, setSelectedSolicitacaoProduto] = useState(null);
    const [isDonationConfirmed, setIsDonationConfirmed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const formataEndereco = (endereco) => {
        const enderecoFormatado = `${endereco?.logradouro}, ${endereco?.numero}, ${endereco?.complemento}, ${endereco?.bairro}`;
        return enderecoFormatado;
    };

    useEffect(() => {
        const buscarSolicitacoes = async () => {
            setIsLoading(true);
            try {
                const responseSolicitacoes = await ApiService.get(
                    `solicitacoes/cliente=${cliente?.id}`,
                    token
                );
                setSolicitacoes(responseSolicitacoes?.data.content);
            } catch (e) {
                console.error('Erro ao buscar as solicitações:', e);
            } finally {
                setIsLoading(false);
            }
        };

        buscarSolicitacoes();
    }, [cliente, token]);

    const fetchSolicitacoes = async () => {
        setIsLoading(true);
        try {
            const responseSolicitacoes = await ApiService.get(
                `solicitacoes/cliente=${cliente?.id}`,
                token
            );
            setSolicitacoes(responseSolicitacoes?.data.content);
        } catch (e) {
            console.error('Erro ao buscar as solicitações:', e);
        } finally {
            setIsLoading(false);
        }
    };

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
            const response = await ApiService.post('doacoes', body, token);
            setShowConfirmationModal(false);
            setIsDonationConfirmed(true);
            fetchSolicitacoes(); // Atualiza a listagem após a doação
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

    const renderProdutos = (solicitacao) => {
        return solicitacao.solicitacaoProduto
            .filter(produto => !produto.jaFoiDoado)
            .map((produto) => (
                <View key={produto.id} style={styles.solicitacaoProdutoContainer}>
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
            ));
    };

    const sortedSolicitacoes = [...solicitacoes].filter(solicitacao =>
        solicitacao.solicitacaoProduto.some(produto => !produto.jaFoiDoado)
    ).sort((a, b) => {
        const aJaFoiDoado = a.solicitacaoProduto.every(produto => produto.jaFoiDoado);
        const bJaFoiDoado = b.solicitacaoProduto.every(produto => produto.jaFoiDoado);

        if (aJaFoiDoado && !bJaFoiDoado) {
            return -1;
        } else if (!aJaFoiDoado && bJaFoiDoado) {
            return 1;
        } else {
            return 0;
        }
    })

    return (
        <Modal visible={true} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
                {cliente !== undefined && (
                    <GenericModal
                        title={cliente?.nomeCompleto}
                        onClose={onCloseModal}
                        body={
                            <>
                                <View style={{ marginBottom: 10 }}>
                                    <Text>{`Endereço: ${formataEndereco(cliente?.endereco)}`}</Text>
                                </View>
                                {isLoading ? (
                                    <ActivityIndicator size="large" color="#C133FF" />
                                ) : (
                                    <View style={styles.scrollView}>
                                        {sortedSolicitacoes.length === 0 ? (
                                            <View style={styles.noSolicitacoesContainer}>
                                                <LottieView
                                                    style={{ width: 200, height: 200 }}
                                                    source={require('./../naoLocalizado.json')}
                                                    autoPlay
                                                    loop
                                                />
                                                <Text style={styles.noSolicitacoesText}>
                                                    Solicitações não encontradas.
                                                </Text>
                                            </View>
                                        ) : (
                                            sortedSolicitacoes.map((solicitacao) => renderProdutos(solicitacao))
                                        )}
                                    </View>
                                )}
                            </>
                        }
                        bottom={
                            <Button
                                label={"Fechar"}
                                onPress={onCloseModal}
                            />
                        }
                    />
                )}

                {showConfirmationModal && (
                    <View style={[styles.modalOverlay, StyleSheet.absoluteFill]}>
                        <View style={styles.confirmationModal}>
                            <Text style={styles.confirmationModalText}>Tem certeza de que deseja confirmar a doação?</Text>
                            <View style={styles.confirmationModalButtons}>
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
                        </View>
                    </View>
                )}

                {isDonationConfirmed && (
                    <View style={styles.animationContainer} pointerEvents={isDonationConfirmed ? "none" : "auto"}>
                        <LottieView
                            source={require('./../139264-fireworks-silver-golden.json')}
                            autoPlay
                            loop
                            style={styles.animation}
                        />
                        <View style={styles.parabensContainer}>
                            <Text style={styles.parabensText}>Obrigado!</Text>
                            <Text style={styles.emojiText}>😊</Text>
                        </View>
                    </View>
                )}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: '#ffffff0',
        width: '100%',
        height: '100%',
    },
    scrollView: {
        flex: 1,
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
    modalOverlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
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
    confirmationModal: {
        position: 'absolute',
        top: '30%',
        left: '10%',
        right: '10%',
        height: '40%',
        borderRadius: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    confirmationModalText: {
        fontSize: 16,
        marginBottom: 20,
    },
    confirmationModalButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    modalButton: {
        marginLeft: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    modalButtonCancelar: {
        backgroundColor: '#FF4F4F',
    },
    modalButtonConfirmar: {
        backgroundColor: '#43C133',
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
    },
    animationContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animation: {
        // width: 200,
        // height: 200,
    },
    parabensContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    parabensText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#C133FF'
    },
    emojiText: {
        fontSize: 36,
    },
    noSolicitacoesContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noSolicitacoesText: {
        fontSize: 16,
        alignSelf: 'center',
        marginBottom: 20,
    },
    noSolicitacoesAnimation: {
        width: 200,
        height: 200,
    },
});

export default SelectClienteReceptor;
