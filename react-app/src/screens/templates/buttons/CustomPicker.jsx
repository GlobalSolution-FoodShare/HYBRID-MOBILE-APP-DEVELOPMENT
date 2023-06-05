import React, { useState } from 'react';
import { Text, TouchableOpacity, Modal, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CustomPicker({ options, selectedValue, onSelect, formikBag }) {
  const [modalVisible, setModalVisible] = useState(false);

  function handleOpenPicker() {
    setModalVisible(true);
  }

  function handleClosePicker() {
    setModalVisible(false);
  }

  function handleOptionSelect(option) {
    setModalVisible(false);
    onSelect(option, formikBag);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.pickerButton} onPress={handleOpenPicker}>
        <Text style={selectedValue ? styles.selectedText : styles.placeholderText}>
          {selectedValue || 'Selecione uma opção'}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#464646" style={styles.arrowIcon} />
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.optionButton}
                onPress={() => handleOptionSelect(option)}
              >
                <Text>{option}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.closeButton} onPress={handleClosePicker}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerButton: {
    width: 334,
    height: 50,
    borderColor: '#DFE2E6',
    borderRadius: 15,
    borderWidth: 2,
    backgroundColor: 'white',
    alignSelf: 'center',
    margin: 15,
    paddingLeft: 20,
    paddingTop: 12,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  arrowIcon: {
    marginRight: 15
  },
  placeholderText: {
    color: '#AAACAE',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    maxHeight: 200,
    width: '80%',
  },
  optionButton: {
    paddingVertical: 10,
    borderBottomWidth: 0.2,
    borderBottomColor: '#DFE2E5',
  },
  closeButton: {
    alignSelf: 'center',
    paddingVertical: 10,
  },
  closeButtonText: {
    color: '#B100FF',
  },
});
