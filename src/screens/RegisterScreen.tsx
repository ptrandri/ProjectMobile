import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native'; // Impor Image
import axios from 'axios';
import logoImage from "../assets/images/register.png"

const RegisterScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://192.168.100.245:8000/api/register', {
        name,
        email,
        password,
        c_password: cPassword,
      });

      if (response.status === 201) {
        setMessage('Registration successful');
      } else {
        setMessage('Registration failed');
      }
    } catch (error) {
      setMessage('An error occurred during registration');
      console.error('An error occurred:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logoImage} style={styles.logo} />

      <Text style={styles.header}>App Project</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(text) => {
          setName(text);
          setMessage('');
        }}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => {
          setEmail(text);
          setMessage('');
        }}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => {
          setPassword(text);
          setMessage('');
        }}
        value={password}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        onChangeText={(text) => {
          setCPassword(text);
          setMessage('');
        }}
        value={cPassword}
        secureTextEntry={true}
      />
      {message ? <Text style={styles.message}>{message}</Text> : null}
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
  message: {
    color: 'red',
    marginTop: 12,
  },
  logo: {
    width: 100, // Sesuaikan ukuran logo sesuai kebutuhan
    height: 100,
    resizeMode: 'contain', // Sesuaikan dengan tipe gambar Anda
    marginBottom: 16,
  },
});

export default RegisterScreen;
