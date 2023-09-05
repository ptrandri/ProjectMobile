import * as React from "react";
import { Image, StyleSheet, View, Text } from "react-native"; // Import Text from 'react-native'
import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import imageLogo from "../assets/images/logo.png"
import axios from "axios";
import colors from "../config/colors";
import strings from "../config/string";

interface State {
  email: string;
  password: string;
  message: string;
}

class LoginScreen extends React.Component<{}, State> {
  readonly state: State = {
    email: "",
    password: "",
    message: ""
  };

  handleEmailChange = (email: string) => {
    this.setState({ email: email });
  };

  handlePasswordChange = (password: string) => {
    this.setState({ password: password });
  };

  handleLoginPress = async () => {
    try {
      const response = await axios.post('http://192.168.100.245:8000/api/login', {
        email: this.state.email,
        password: this.state.password,
      });

      if (response.status === 201) {
        this.setState({ message: 'Login successful' });
      } else {
        this.setState({ message: 'Login failed' });
      }
    } catch (error) {
      this.setState({ message: 'An error occurred during Login' });
      console.error('An error occurred:', error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={imageLogo} style={styles.logo} />
        <View style={styles.form}>
          <FormTextInput
            value={this.state.email}
            onChangeText={this.handleEmailChange}
            placeholder={strings.EMAIL_PLACEHOLDER}
          />
          <FormTextInput
            value={this.state.password}
            onChangeText={this.handlePasswordChange}
            placeholder={strings.PASSWORD_PLACEHOLDER}
            secureTextEntry={true}
          />
          <Button label={strings.LOGIN} onPress={this.handleLoginPress} />
          <Text>{this.state.message}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: "center",
    justifyContent: "space-between"
  },
  logo: {
    flex: 1,
    width: "100%",
    resizeMode: "contain",
    alignSelf: "center"
  },
  form: {
    flex: 1,
    justifyContent: "center",
    width: "80%"
  }
});

export default LoginScreen;
