import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importe o ícone desejado da biblioteca

const GenericModal = ({ title, body, bottom, onClose }) => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>{title}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="times" style={styles.closeIcon} />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.modalBody}>{body}</ScrollView>
        <View style={styles.modalBottom}>{bottom}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',

  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    width: '90%',
    maxHeight: '80%'
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomColor: '#6969696f',
    borderBottomWidth: 0.6,
    marginVertical: 10,
    marginTop: 2,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  closeButton: {
    marginBottom: 10
  },
  modalBody: {
    marginBottom: 16,
  },
  closeButton: {
    marginBottom: 10,
  },
  closeIcon: {
    fontSize: 20,
    color: '#fd2525b3',
  },
});

export default GenericModal;
