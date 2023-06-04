import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function Inputs({ label, value, onChangeText, placeholder, password, type, maxLength }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View>
      <Text style={styles.text}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={'#AAACAE'}
          style={styles.input}
          secureTextEntry={!showPassword && password}
          keyboardType={type}
          maxLength={maxLength}
        />
        {password && (
          <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
            <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={17} color="#AAACAE" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 334,
    height: 50,
    borderColor: '#DFE2E6',
    borderRadius: 15,
    borderWidth: 2,
    alignSelf: 'center',
    margin: 15,
    paddingLeft: 20,
  },
  input: {
    flex: 1,
  },
  eyeIcon: {
    padding: 10,
    
  },
  text: {
    marginLeft: 30,
    marginTop: 20,
  },
});
