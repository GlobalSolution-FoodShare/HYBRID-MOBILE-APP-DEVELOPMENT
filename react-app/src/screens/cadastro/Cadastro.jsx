import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Inputs from '../templates/buttons/Inputs';
import Logo from '../templates/img/Logo';
import SpanBold from '../templates/text/SpanBold';
import CustomPicker from '../templates/buttons/CustomPicker';
import Button from '../templates/buttons/Button.jsx';
import CustomTextErro from '../templates/buttons/CustomTextErro';
import { useNavigation } from '@react-navigation/native';
import CadastroContext from '../../context/CadastroContext';

export default function Cadastro() {
  const navigation = useNavigation();
  const { cadastroInfo, setCadastroInfo } = useContext(CadastroContext);
  
  const optionsPicker = ['DOADOR', 'RECEPTOR'];
  const [selectedTipo, setSelectedTipo] = useState(null);

  const validationSchema = Yup.object().shape({
    cpf: Yup.string()
      .required('CPF é obrigatório')
      .length(14, 'CPF deve ter exatamente 14 dígitos'),
    nome: Yup.string().required('Nome é obrigatório'),
    tipo: Yup.string().required('Selecione uma opção'),
  });

  const formatCPF = (value) => {
  // Remove all non-digit characters from the value
  const numericValue = value.replace(/\D/g, '');

  // Apply the CPF mask
  let formattedValue = numericValue;
  if (numericValue.length > 3) {
    formattedValue = `${numericValue.slice(0, 3)}.${numericValue.slice(3)}`;
  }
  if (numericValue.length > 6) {
    formattedValue = `${formattedValue.slice(0, 7)}.${formattedValue.slice(7)}`;
  }
  if (numericValue.length > 9) {
    formattedValue = `${formattedValue.slice(0, 11)}-${formattedValue.slice(11)}`;
  }

  return formattedValue;
};
  const handleSubmit = (values) => {
    setCadastroInfo(values);
    navigation.navigate('Endereco');
  };

  const handlePickerSelect = (option, formikBag) => {
    setSelectedTipo(option);
    formikBag.setFieldValue('tipo', option);
  };

  const handleCPFChange = (value, setFieldValue) => {
    const formattedValue = formatCPF(value);
    const maxLength = 14; // Maximum length of CPF
    const truncatedValue = formattedValue.slice(0, maxLength);
    setFieldValue('cpf', truncatedValue);
  };

  return (
    <View>
      <Logo />
      <SpanBold label="Crie uma conta" positionStyle={styles.positionCriaConta} />
      <Text style={styles.text}>Fale mais sobre você</Text>

      <Formik
        initialValues={{ cpf: '', nome: '', tipo: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, setFieldValue }) => (
          <View>
            <Inputs
              label="CPF"
              placeholder="CPF"
              onChangeText={(value) => handleCPFChange(value, setFieldValue)}
              onBlur={handleBlur('cpf')}
              value={values.cpf}
              error={touched.cpf && errors.cpf}
            />
            {errors.cpf && touched.cpf && <CustomTextErro error={errors.cpf} />}
            <Inputs
              label="Nome Completo"
              placeholder="Nome Completo"
              onChangeText={handleChange('nome')}
              onBlur={handleBlur('nome')}
              value={values.nome}
              error={touched.nome && errors.nome}
            />
            {errors.nome && touched.nome && <CustomTextErro error={errors.nome} />}

            <Text style={styles.text}>Doador ou Receptor</Text>
            <CustomPicker
              options={optionsPicker}
              selectedValue={values.tipo}
              onSelect={handlePickerSelect}
              formikBag={{ setFieldValue, touched, errors }} // Passar setFieldValue, touched e errors diretamente para o CustomPicker
            />
            {touched.tipo && errors.tipo && <CustomTextErro error={errors.tipo} />}

            <View style={styles.buttonContainer}>
              <Button
                label="Proxima etapa"
                position={styles.positionCadastro}
                disabled={!isValid}
                loading={false}
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
    marginTop: 20,
  },
});
