import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Checkbox } from 'react-native-paper';

const Login = () => {
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const loadEmail = async () => {
      const savedEmail = await AsyncStorage.getItem('savedEmail');
      if (savedEmail) {
        setRememberMe(true);
      }
    };
    loadEmail();
  }, []);

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
      })}
      onSubmit={async (values, { resetForm }) => {
        if (rememberMe) {
          await AsyncStorage.setItem('savedEmail', values.email);
        } else {
          await AsyncStorage.removeItem('savedEmail');
        }
        Alert.alert('Success', 'Login Successful');
        resetForm();
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <LinearGradient  colors={['#8B0000', '#000000','#000000','#000000','#000000', '#000000' ,'#8B0000']}   style={styles.formContainer}>
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
          />
          {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
          />
          {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

          <View style={styles.checkboxContainer}>
            <Checkbox
              status={rememberMe ? 'checked' : 'unchecked'}
              onPress={() => setRememberMe(!rememberMe)}
              color="blue"
            />
            <Text style={styles.Checkboxtitle}  >Remember Me</Text>
          </View>

          <Button color={"#8B0000"}  title="Login" onPress={handleSubmit as any} />
        </LinearGradient>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  Checkboxtitle:{
    color: 'white',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default Login;
