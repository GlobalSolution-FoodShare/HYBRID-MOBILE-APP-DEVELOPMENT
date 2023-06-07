
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import logo from '../../../assets/logo.png';
import Inputs from '../templates/buttons/Inputs';
import Button from '../templates/buttons/Button';
import TextAsButton from '../templates/buttons/TextAsButton';
import imagemRoot from '../../../assets/imagem-tela-principal.png';
import CustomTextErro from '../templates/buttons/CustomTextErro';
import React, { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';


export default function Login() {
    const { signIn, token } = useContext(AuthContext);
    const navigation = useNavigation();



    const handleLogin = async (values) => {
        try {
            const success = await signIn(values);
            if (success) {
            } else {
                console.error("Email ou senha incorretos");
            }
        } catch (error) {
            console.error(error);
        }
    };



    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Email inválido').required('Campo obrigatório'),
        senha: Yup.string().required('Campo obrigatório'),
    });


    const handleSnackbarClose = () => {
        setSnackbarVisible(false);
    };

    return (
        <View>
            <View>
                <View style={styles.containerRoot}>
                    <Image source={logo} style={{ marginLeft: 20 }} />
                    <Image source={imagemRoot} style={styles.imagemRoot} />
                    <Text>Food Share</Text>
                </View>

                <Formik
                    initialValues={{ email: '', senha: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleLogin}
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
                            {errors.email && <CustomTextErro error={errors.email} />}
                            <Inputs
                                label="Senha"
                                placeholder="Digite sua senha"
                                password={true}
                                onChangeText={handleChange('senha')}
                                onBlur={handleBlur('senha')}
                                value={values.senha}
                                error={touched.senha && errors.senha}
                            />
                            {errors.senha && <CustomTextErro error={errors.senha} />}


                            <Button
                                label="Login"
                                namePage="Home"
                                position={styles.positionCadastro}
                                disabled={!isValid}
                                loading={false}
                                onPress={handleSubmit}
                            />
                        </View>
                    )}
                </Formik>

                <TextAsButton
                    label="Crie uma conta"
                    namePage="Cadastro"
                    positionStyle={styles.positionEsqueciSenha}
                />


            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    positionCadastro: {
        marginTop: 50,
    },
    positionEsqueciSenha: {
        marginTop: 35,
        marginRight: 135,
    },
    containerRoot: {
        width: '100%',
        height: 250,
    },
    imagemRoot: {
        position: 'absolute',
        marginTop: -16,
    },
});