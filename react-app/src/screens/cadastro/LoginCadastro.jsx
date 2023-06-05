import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Inputs from '../templates/buttons/Inputs';
import Logo from '../templates/img/Logo';
import SpanBold from '../templates/text/SpanBold';
import Button from '../templates/buttons/Button.jsx';
import CustomTextErro from '../templates/buttons/CustomTextErro';
import { useNavigation } from '@react-navigation/native';
import CadastroContext from '../../context/CadastroContext';
import ApiService from '../../service/ApiService';



export default function LoginCadastro() {
    const navigation = useNavigation();
    const { cadastroInfo, setCadastroInfo } = useContext(CadastroContext);
    const [loading, setLoading] = useState(false);

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Email inválido').required('Email é obrigatório'),
        senha: Yup.string()
            .min(8, 'A senha deve ter pelo menos 8 caracteres')
            .max(15, 'A senha deve ter no máximo 15 caracteres')
            .required('Senha é obrigatória'),
        confirmSenha: Yup.string()
            .oneOf([Yup.ref('senha'), null], 'As senhas devem coincidir')
            .required('Confirmação de senha é obrigatória'),
    });

    const handleSubmit = (values) => {
        setCadastroInfo(values)

        cadastrarCliente({
            "email": values.email,
            "senha": values.senha,
            "cliente": cadastroInfo.id
        })

    };

    const cadastrarCliente = async (data) => {
        setLoading(true)
        try {
            const response = await ApiService.post('registrar', data);
            navigation.navigate('LoginCadastro');
            setCadastroInfo(response)
            navigation.navigate("Login")

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

    return (
        <View>
            <Logo />
            <SpanBold label="Crie uma conta" positionStyle={styles.positionCriaConta} />
            <Text style={styles.text}>Fale mais sobre você</Text>

            <Formik
                initialValues={{ email: '', senha: '', confirmSenha: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                    <View>
                        <Inputs
                            label="Email"
                            placeholder="Email"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            error={touched.email && errors.email}
                        />
                        {errors.email && touched.email && <CustomTextErro error={errors.email} />}

                        <Inputs
                            label="Senha"
                            placeholder="Senha"
                            secureTextEntry
                            onChangeText={handleChange('senha')}
                            onBlur={handleBlur('senha')}
                            value={values.senha}
                            password={true}
                            error={touched.senha && errors.senha}
                        />
                        {errors.senha && touched.senha && <CustomTextErro error={errors.senha} />}

                        <Inputs
                            label="Confirme a Senha"
                            placeholder="Confirme a Senha"
                            secureTextEntry
                            password={true}
                            onChangeText={handleChange('confirmSenha')}
                            onBlur={handleBlur('confirmSenha')}
                            value={values.confirmSenha}
                            error={touched.confirmSenha && errors.confirmSenha}
                        />
                        {errors.confirmSenha && touched.confirmSenha && <CustomTextErro error={errors.confirmSenha} />}

                        <View style={styles.buttonContainer}>
                            <Button
                                label="Proxima etapa"
                                position={styles.positionCadastro}
                                disabled={!isValid}
                                loading={loading}
                                onPress={handleSubmit}
                            />
                        </View>
                    </View>
                )}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({
    positionCriaConta: {
        alignSelf: 'flex-start',
        marginTop: 30,
        marginLeft: 10,
    },
    text: {
        marginLeft: 30,
        marginTop: 20,
    },
    positionNextStep: {
        marginTop: 270,
        width: 335,
        height: 51,
    },
    container: {
        flex: 1,
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 15,
        paddingBottom: 15,
    },
    buttonContainer: {
        marginTop: 25
    },
});
