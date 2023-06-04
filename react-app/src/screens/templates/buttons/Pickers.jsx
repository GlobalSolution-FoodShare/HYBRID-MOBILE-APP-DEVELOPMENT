import React , {useState, useRef} from 'react'
import {  Text , StyleSheet, TouchableOpacity} from 'react-native'
import {Picker} from '@react-native-picker/picker';

export default function Pickers({ label, placeholder, onPress}) {

    const [selectedLanguage, setSelectedLanguage] = useState();

    const pickerRef = useRef();

    function openPicker() {
    pickerRef.current.focus();
    }

    function closePicker() {
    pickerRef.current.blur();
    }

    return (
        <>
            <Text style={styles.text}>{label}</Text>
            <TouchableOpacity 
                style={styles.pickers}
                onPress={openPicker}    
            >
                {/* <Text style={styles.placeholder}>{placeholder}</Text> */}

                <Picker
                    ref={pickerRef}
                    selectedValue={selectedLanguage}
                    style={styles.picker}
                    mode={'dropdown'}
                    onValueChange={(itemValue, itemIndex) =>
                    setSelectedLanguage(itemValue)}
                >
                    <Picker.Item label="Doador" value="doador" />
                    <Picker.Item label="Receptor" value="receptor" />

                </Picker>

            </TouchableOpacity>

            
        </>
    )
}

const styles = StyleSheet.create({
    pickers:{
        width:334,
        height: 50,
        borderColor:'#DFE2E6',
        borderRadius: 15,
        borderWidth:2,
        alignSelf: 'center',
        margin: 15,
        paddingLeft: 10,
    },
    text: {
        marginLeft:30,
        marginTop: 20
    },
    placeholder:{
        color:"#AAACAE",
        marginTop: 0
    },
    picker:{
        color:"#AAACAE",
    }
})