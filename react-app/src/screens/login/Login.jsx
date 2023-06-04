import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import logo from '../../../assets/logo.png';
import Inputs from '../templates/buttons/Inputs';
import Button from '../templates/buttons/Button';
import TextAsButton from '../templates/buttons/TextAsButton';
import imagemRoot from '../../../assets/imagem-tela-principal.png';

export default function Login() {
  const navigation = useNavigation();

  const handleLogin = (values) => {
  
    console.log(values);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email inválido').required('Campo obrigatório'),
    password: Yup.string().required('Campo obrigatório'),
  });

  return (
    <View>
      <View style={styles.containerRoot}>
        <Image source={logo} style={{ marginLeft: 20 }} />
        <Image source={imagemRoot} style={styles.imagemRoot} />
        <Text>Food Share</Text>
      </View>

      <Formik
        initialValues={{ email: '', password: '' }}
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
            <Inputs
              label="Senha"
              placeholder="Digite sua senha"
              password={true}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              error={touched.password && errors.password}
            />

            <Button
              label="Login"
              namePage="Home"
              position={styles.positionCadastro}
              disabled={!isValid}
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
