import React, { useState, useEffect, useContext, useCallback, useMemo } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import AuthContext from "../../context/AuthContext";
import ApiService from "../../service/ApiService";
import LogadoContext from "../../context/LogadoContext";

const Pedidos = () => {
  const { token } = useContext(AuthContext);
  const { cliente } = useContext(LogadoContext);
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [doacoes, setDoacoes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(4);
  const [totalSolicitacoes, setTotalSolicitacoes] = useState(0);
  const [totalDoacoes, setTotalDoacoes] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchSolicitacoes = useCallback(async () => {
    setIsLoading(true);
    const responseSolicitacoes = await ApiService.get(
      `solicitacoes/cliente=${cliente?.id}?page=${page}&size=${pageSize}`,
      token
    );
    setTotalSolicitacoes(responseSolicitacoes?.data.totalElements);
    setSolicitacoes(responseSolicitacoes?.data.content);
    setTotalPages(responseSolicitacoes?.data.totalPages);
    setIsLoading(false);
  }, [cliente?.id, token, page, pageSize]);

  const fetchDoacoes = useCallback(async () => {
    setIsLoading(true);
    const responseDoacoes = await ApiService.get(
      `doacoes/cliente=${cliente?.id}?page=${page}&size=${pageSize}`,
      token
    );

    setTotalDoacoes(responseDoacoes?.data.totalElements);
    setDoacoes(responseDoacoes?.data.content);
    setTotalPages(responseDoacoes?.data.totalPages);
    setIsLoading(false);
  }, [cliente?.id, token, page, pageSize]);

  useEffect(() => {
    if (cliente?.perfil === 'RECEPTOR') {
      fetchSolicitacoes();
    } else if (cliente?.perfil === 'DOADOR') {
      fetchDoacoes();
    }
  }, [cliente, token, fetchSolicitacoes, fetchDoacoes]);

  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setPage(prevPage => prevPage - 1);
      setCurrentPage(prevPage => prevPage - 1);
    }
  }, [currentPage]);

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setPage(prevPage => prevPage + 1);
      setCurrentPage(prevPage => prevPage + 1);
    }
  }, [currentPage, totalPages]);

  const SolicitacaoItem = useMemo(() => ({ item }) => (
    <View key={item.id} style={styles.itemContainer}>
      <Text style={{ color: '#C133FF', fontWeight: '400', fontSize: 12, marginBottom: 5 }}><Text>Solicitação: </Text>{item.id}</Text>
      <View style={styles.produtosContainer}>
        <Text style={{ color: 'black' }}>Produtos solicitados:</Text>
        {item.solicitacaoProduto.map((produto) => (
          <View key={produto.id} style={styles.produtoItem}>
            <Text style={{ color: '#C133FF', fontWeight: '300' }}>{produto.quantidade}x  <Text style={{ color: 'black' }}>{produto.produto.nome}</Text></Text>
            <Text style={{ color: '#C133FF', fontWeight: '300' }}>Recebido doação: <Text style={{ color: 'black' }} >{produto.jaFoiDoado ? 'Sim' : 'Não'}</Text></Text>
            <View style={{ borderColor: 'grey', borderBottomWidth: 0.6, marginVertical: 10 }} />
          </View>
        ))}
      </View>
      <Text style={{ color: 'black', fontSize: 13 }}>Status: {item.status}</Text>

    </View>
  ), []);

  const DoacaoItem = useMemo(() => ({ item }) => (
    <View key={item.id} style={styles.itemContainer}>
      <Text style={{ color: '#C133FF', fontWeight: '400', fontSize: 12, marginBottom: 5 }}><Text>Pedido: </Text>{item.id}</Text>
      <Text style={{ color: '#C133FF', fontWeight: '300' }}>{item.solicitacaoProduto.quantidade}x  <Text style={{ color: 'black' }}>{item.solicitacaoProduto.produto.nome}</Text></Text>
      <Text style={{ color: '#C133FF', fontWeight: '300' }}>Para: <Text style={{ color: 'black' }} >{item.nomeSolicitante}</Text></Text>
    </View>
  ), []);

  return (
    <View style={styles.container}>
      {cliente?.perfil === 'RECEPTOR' && (
        <>
          <FlatList
            data={solicitacoes}
            renderItem={SolicitacaoItem}
            keyExtractor={item => item.id.toString()}
          />
          <View style={styles.paginationContainer}>
            <TouchableOpacity
              style={[styles.paginationButton, currentPage === 1 && styles.disabledPaginationButton]}
              onPress={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <Text style={styles.paginationButtonText}>Anterior</Text>
            </TouchableOpacity>
            <Text style={styles.paginationText}>{currentPage} / {totalPages}</Text>
            <TouchableOpacity
              style={[styles.paginationButton, currentPage === totalPages && styles.disabledPaginationButton]}
              onPress={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <Text style={styles.paginationButtonText}>Próxima</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {cliente?.perfil === 'DOADOR' && (
        <>
          <FlatList
            data={doacoes}
            renderItem={DoacaoItem}
            keyExtractor={(item, index) => item.id.toString() + index.toString()}
          />
          <View style={styles.paginationContainer}>
            <TouchableOpacity
              style={[styles.paginationButton, currentPage === 1 && styles.disabledPaginationButton]}
              onPress={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <Text style={styles.paginationButtonText}>Anterior</Text>
            </TouchableOpacity>
            <Text style={styles.paginationText}>{currentPage} / {totalPages}</Text>
            <TouchableOpacity
              style={[styles.paginationButton, currentPage === totalPages && styles.disabledPaginationButton]}
              onPress={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <Text style={styles.paginationButtonText}>Próxima</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingBottom: 25,
    marginBottom: 15
  },
  itemContainer: {
    borderColor: 'black',
    borderWidth: 0.6,
    marginVertical: 20,
    marginTop: 2,
    padding: 15,
    borderRadius: 16,
  },
  itemId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  produtosContainer: {
    marginTop: 10,
  },
  produtosTitle: {
    fontWeight: 'bold',
  },
  produtoItem: {
    marginLeft: 10,
  },
  status: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30
  },
  paginationButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#C133FF',
    borderRadius: 8,
  },
  disabledPaginationButton: {
    backgroundColor: '#999999',
  },
  paginationButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  paginationText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Pedidos;
