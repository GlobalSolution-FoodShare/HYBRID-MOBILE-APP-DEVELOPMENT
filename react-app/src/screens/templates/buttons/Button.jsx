import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Button = ({ label, onPress, loading, position }) => {
    return (
        <TouchableOpacity
            disabled={loading}
            style={styles.button}
            onPress={onPress}
        >
            <LinearGradient
                colors={loading ? ['#444444', '#797979'] : ['#C133FF', '#8E00CC']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.container, position, loading && styles.loadingContainer]}
            >
                {loading ? <ActivityIndicator
                    size="small"
                    color="white" /> : <Text style={styles.label}>{label}</Text>}
            </LinearGradient>

        </TouchableOpacity>
    );
};

export default Button;

const styles = StyleSheet.create({
    container: {
        flex: 0,
        width: 335,
        height: 51,
        borderRadius: 20,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        // fontFamily: 'DMSans-Bold',
        fontStyle: 'normal',
        fontSize: 14,
        lineHeight: 47,
        textAlign: 'center',
        color: '#fff',
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});
