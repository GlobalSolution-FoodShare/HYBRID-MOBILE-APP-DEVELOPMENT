import React, { useRef, useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Logo from '../templates/img/Logo';
import Inputs from '../templates/buttons/Inputs';
import { Ionicons } from '@expo/vector-icons';
import Button from '../templates/buttons/Button';
import CadastroContext from '../../context/CadastroContext';
import { useNavigation } from '@react-navigation/native';
import CustomTextErro from '../templates/buttons/CustomTextErro';
import ApiService from '../../service/ApiService';
import Cliente from './../../models/Cliente'
import Enderecos from './../../models/Enderecos'

export default function Endereco() {
    const { cadastroInfo, setCadastroInfo } = useContext(CadastroContext);
    const navigation = useNavigation();
    const ref = useRef();
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [enderecoError, setEnderecoError] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longetude, setLongetude] = useState('');
    const [loading, setLoading] = useState(false)
    const handleInputChange = (text) => {
        ref.current?.setAddressText(text);
    };

    const handleNext = () => {
        setEnderecoError(false)
        if (!rua || !numero) {
            setEnderecoError(true)
        } else {

            let endereco = new Enderecos(
                cep,
                bairro,
                rua,
                numero,
                complemento,
                cidade,
                cidade,
                uf,
                latitude,
                longetude);
            let cliente = new Cliente(cadastroInfo.cpf, cadastroInfo.nome, cadastroInfo.tipo, endereco);
            
           cadastrarCliente(cliente)
        }
    };


    const cadastrarCliente = async (data) => {
        console.log(data)

        setLoading(true)
        try {
            const response = await ApiService.post('cliente/registrar', data);
            navigation.navigate('LoginCadastro');
            setCadastroInfo(response)
          } catch (error) {
            if (Platform.OS === 'android' || Platform.OS === 'ios') {
              console.error("Erro ao validar");
            } else {
              setSnackbarVisible(true);
      
            }
      
          } finally {
            setLoading(false)
          }
    };




    const handlePlaceSelect = async (data, details = null) => {
        if (details) {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?place_id=${details.place_id}&key=AIzaSyAZrxNnQsUNY8aCA7sKOlQEvtMlgjOF9XM`
            );
            const result = await response.json();


            if (result.status === 'OK') {
                const addressComponents = result.results[0].address_components;
                const geometryComponents = result.results[0].geometry.location;
                const cepComponent = addressComponents.find(
                    (component) =>
                        component.types.includes('postal_code_prefix') ||
                        component.types.includes('postal_code')
                );
                const ruaComponent = addressComponents.find((component) =>
                    component.types.includes('route')
                );
                const bairroComponent = addressComponents.find(
                    (component) =>
                        component.types.includes('sublocality') ||
                        component.types.includes('neighborhood')
                );
                const cidadeComponent = addressComponents.find(
                    (component) =>
                        component.types.includes('administrative_area_level_2') ||
                        component.types.includes('locality') ||
                        component.types.includes('vicinity')
                );
                const ufComponent = addressComponents.find((component) =>
                    component.types.includes('administrative_area_level_1')
                );
                const numeroComponent = addressComponents.find((component) =>
                    component.types.includes('street_number')
                );


                setCep(cepComponent?.long_name || '');
                setRua(ruaComponent?.long_name || '');
                setBairro(bairroComponent?.long_name || '');
                setCidade(cidadeComponent?.long_name || '');
                setUf(ufComponent?.short_name || '');
                setNumero(numeroComponent?.long_name || '');
                setLatitude(geometryComponents?.lat)
                setLongetude(geometryComponents?.lng)
            }
        }
    };

    useEffect(() => {
    }, [cep, rua, bairro, cidade, numero, uf, latitude, longetude]);

    return (
        <View>
            <Logo />
            <View style={{ marginTop: 10, marginBottom: 6 }}>
                <GooglePlacesAutocomplete
                    ref={ref}
                    placeholder="Digite o endereço"
                    onPress={handlePlaceSelect}
                    query={{
                        key: 'AIzaSyAZrxNnQsUNY8aCA7sKOlQEvtMlgjOF9XM',
                        language: 'pt-BR',
                    }}
                    fetchDetails={true}
                    onFail={(error) => console.error(error)}
                    onChangeText={handleInputChange}
                    styles={{
                        textInputContainer: {
                        },
                        textInput: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: 334,
                            height: 50,
                            borderColor: '#DFE2E6',
                            borderRadius: 15,
                            borderWidth: 2,
                            alignSelf: 'center',
                            margin: 15,
                            backgroundColor: 'white',
                            paddingLeft: 20,
                        },
                        predefinedPlacesDescription: {
                            color: '#bdd4dd',
                        },
                        container: {
                            flex: 0,
                        },
                    }}
                />
                <Text style={{ marginLeft: 20, fontSize: 13 }}>Obs: coloque o número do seu endereço</Text>
                {enderecoError && <CustomTextErro error={enderecoError} />}
            </View>

            {/* <TouchableOpacity
                style={styles.adicionarComplemento}
                onPress={() => setShowComplemento(!showComplemento)}
            >
                <Ionicons name="add-circle-outline" size={20} color="#C133FF" style={styles.arrowIcon} />
                <Text style={styles.text}>Tem complemento?</Text>
            </TouchableOpacity> */}

            {/* {showComplemento && (
                <Inputs
                    label="Complemento"
                    placeholder="Apartamento, casa"
                />
            )} */}

            <View style={{ marginTop: 25 }}>
                <Button
                    label="Próxima etapa"
                    loading={loading}
                    onPress={handleNext}
                />
            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    inputTexto: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 334,
        height: 50,
        borderColor: '#DFE2E6',
        borderRadius: 15,
        borderWidth: 2,
        alignSelf: 'center',
        margin: 15,
        backgroundColor: 'white',
        paddingLeft: 20,
    },
    adicionarComplemento: {
        marginLeft: 15,
        marginTop: 10,
        flexDirection: 'row',
    },
    text: {
        color: '#C133FF',
        marginLeft: 5
    }
});
