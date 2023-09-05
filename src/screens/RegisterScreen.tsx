import React, { Component } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
    };
  }

  handleNameChange = (name) => {
    this.setState({ name });
  };

  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  handleRegisterPress = async () => {
    try {
      const response = await axios.post('http://localhost:8000/register', {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      });

      // Handle success, e.g., navigate to the login screen
      Alert.alert('Registration Successful', 'You can now log in.');
      this.props.navigation.navigate('Login');
    } catch (error) {
      // Handle registration error
      Alert.alert('Registration Failed', 'An error occurred during registration.');
    }
  };

  render() {
    return (
      <View>
        <TextInput
          value={this.state.name}
          onChangeText={this.handleNameChange}
          placeholder="Name"
        />
        <TextInput
          value={this.state.email}
          onChangeText={this.handleEmailChange}
          placeholder="Email"
        />
        <TextInput
          value={this.state.password}
          onChangeText={this.handlePasswordChange}
          placeholder="Password"
          secureTextEntry={true}
        />
        <Button title="Register" onPress={this.handleRegisterPress} />
      </View>
    );
  }
}

export default RegisterScreen;
