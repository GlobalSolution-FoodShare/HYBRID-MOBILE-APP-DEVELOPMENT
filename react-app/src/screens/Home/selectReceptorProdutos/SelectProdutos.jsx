import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, TouchableOpacity, Text, ScrollView, Modal, ActivityIndicator } from 'react-native';
import LottieView from 'lottie-react-native';
import GenericModal from "../../templates/modal/GenericModal";
import ApiService from "../../../service/ApiService";
import Button from "../../templates/buttons/Button";
import AuthContext from "../../../context/AuthContext";
import LogadoContext from "../../../context/LogadoContext";

const SelectProdutos = ({ onCloseModal }) => {
    const { token, idCliente } = useContext(AuthContext);
    const [produtos, setProdutos] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [quantidadesSelecionadas, setQuantidadesSelecionadas] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(true);

    useEffect(() => {
        const fetchProdutos = async () => {
            setIsLoading(true);
            try {
                const response = await ApiService.get(`produtos?page=${currentPage}&size=5`, token);
                setProdutos(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error("Error fetching produtos:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProdutos();
    }, [token, currentPage]);

    const handlePageChange = async (page) => {
        setIsLoading(true);
        setCurrentPage(page);
    };

    const handleIncrement = (produtoId) => {
        setQuantidadesSelecionadas((prevState) => ({
            ...prevState,
            [produtoId]: (prevState[produtoId] || 0) + 1,
        }));
    };

    const handleDecrement = (produtoId) => {
        setQuantidadesSelecionadas((prevState) => {
            const quantidadeAtual = prevState[produtoId] || 0;
            if (quantidadeAtual > 0) {
                const updatedQuantidadesSelecionadas = { ...prevState };
                updatedQuantidadesSelecionadas[produtoId] = quantidadeAtual - 1;
                if (updatedQuantidadesSelecionadas[produtoId] === 0) {
                    delete updatedQuantidadesSelecionadas[produtoId];
                }
                return updatedQuantidadesSelecionadas;
            }
            return prevState;
        });
    };

    const handleFechar = async () => {
        setIsSubmitting(true);
        try {
            const solicitacoesProduto = Object.entries(quantidadesSelecionadas).map(([produtoId, quantidade]) => ({
                produto: { id: parseInt(produtoId) },
                quantidade,
            }));

            const body = {
                cliente: idCliente,
                solicitacoesProduto,
            };

            const response = await ApiService.post("solicitacoes", body, token);

            setIsSuccessModalVisible(true);
            setIsModalVisible(false); // Fechar o modal principal

            setTimeout(() => {
                setIsSuccessModalVisible(false);
                onCloseModal();
            }, 2000);
        } catch (error) {
            console.error("Error creating solicitação:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderProdutos = () => {
        return produtos.map((produto) => {
            const quantidadeSelecionada = quantidadesSelecionadas[produto.id] || 0;

            return (
                <View key={produto.id} style={styles.produtoContainer}>
                    <View style={styles.produtoInfoContainer}>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.produtoNome}>{produto.nome}</Text>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.produtoDescricao}>{produto.descricao}</Text>
                    </View>
                    <View style={styles.quantidadeContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleDecrement(produto.id)}
                        >
                            <Text style={styles.buttonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantidadeText}>{quantidadeSelecionada}</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleIncrement(produto.id)}
                        >
                            <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        });
    };

    const renderPaginator = () => {
        const pageIndicator = `${currentPage + 1} de ${totalPages}`;

        return (
            <View style={styles.paginatorContainer}>
                <TouchableOpacity
                    style={[styles.paginatorButton, currentPage === 0 && styles.disabledButton]}
                    disabled={currentPage === 0}
                    onPress={() => handlePageChange(currentPage - 1)}
                >
                    <Text style={styles.paginatorButtonText}>Anterior</Text>
                </TouchableOpacity>

                <Text style={styles.pageIndicator}>{pageIndicator}</Text>

                <TouchableOpacity
                    style={[styles.paginatorButton, currentPage === totalPages - 1 && styles.disabledButton]}
                    disabled={currentPage === totalPages - 1}
                    onPress={() => handlePageChange(currentPage + 1)}
                >
                    <Text style={styles.paginatorButtonText}>Próximo</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <Modal visible={true} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
                {isModalVisible && (
                    <GenericModal
                        title={"Selecione os produtos"}
                        onClose={onCloseModal}
                        body={
                            <>
                                <ScrollView style={styles.scrollViewContainer}>
                                    <View style={styles.scrollViewContent}>
                                        {isLoading ? (
                                            <ActivityIndicator size="large" color="#C133FF" />
                                        ) : (
                                            renderProdutos()
                                        )}
                                    </View>
                                </ScrollView>

                                {renderPaginator()}
                            </>
                        }
                        bottom={
                            <Button label={"Gerar solicitação"} onPress={handleFechar} disabled={isSubmitting} />
                        }
                    />
                )}
            </View>
            {isSuccessModalVisible && (
                <View style={styles.successModal}>
                    <LottieView
                        style={{ width: 200, height: 200 }}
                        source={require('./../sucess.json')}
                        autoPlay
                        loop
                    />
                    <Text style={styles.successText}>Solicitação feita com sucesso!!</Text>
                </View>
            )}
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: "#ffffff0",
        width: "100%",
        height: "100%",
    },
    scrollViewContainer: {
        flex: 1,
    },
    scrollViewContent: {
        paddingBottom: 0
    },
    produtoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#F3F3F3",
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 12,
    },
    produtoInfoContainer: {
        flex: 1,
    },
    produtoNome: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
        overflow: "hidden",
    },
    produtoDescricao: {
        fontSize: 14,
        overflow: "hidden",
    },
    quantidadeContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: '#C133FF',
        borderRadius: 15,
    },
    button: {
        width: 25,
        height: 25,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
    },
    quantidadeText: {
        marginHorizontal: 10,
        fontSize: 16,
        color: 'white'
    },
    paginatorContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginVertical: 12,
    },
    paginatorButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginHorizontal: 4,
        backgroundColor: "#C133FF",
    },
    disabledButton: {
        opacity: 0.5,
        backgroundColor: '#999999',
    },
    paginatorButtonText: {
        color: "white",
        fontSize: 14,
    },
    pageIndicator: {
        marginHorizontal: 12,
        fontSize: 14,
        fontWeight: "bold",
    },
    successModal: {
        position: 'absolute',
        top: '40%',
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 8,
        elevation: 4,
    },
    successText: {
        textAlign: 'center',
        color: 'green',
    },
});

export default SelectProdutos;
