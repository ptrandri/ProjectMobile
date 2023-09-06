import React, { useState, useEffect } from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import imageLogo from "../assets/images/logo.png"
import axios from "axios";
import colors from "../config/colors";
import strings from "../config/string";
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from "../routes/Stack";
import { storeTokenLocally } from "../config/storage";

interface State {
  email: string;
  password: string;
  message: string;
}

const LoginScreen = () => {
  const navigation = useNavigation<StackTypes>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (email: string) => {
    setEmail(email);
  };

  const handlePasswordChange = (password: string) => {
    setPassword(password);
  };

  const handleLoginPress = async () => {
    try{
      const response = await axios.post("http://192.168.100.245:8000/api/login", {
        email: email,
        password: password,
    });

    if (response.status ===201){
      const authToken = response.data.token;
      storeTokenLocally(authToken);
      setMessage("Login successful");
      navigation.navigate("Dashboard");
    } else{
      setMessage("Login Failed")
    }
    } catch(error){
      setMessage("An error occurred during Login");
      console.error("An error occurred:", error);
    };
  };

  return (
    <View style={styles.container}>
      <Image source={imageLogo} style={styles.logo} />
      <View style={styles.form}>
        <FormTextInput
          value={email}
          onChangeText={handleEmailChange}
          placeholder={strings.EMAIL_PLACEHOLDER}
        />
        <FormTextInput
          value={password}
          onChangeText={handlePasswordChange}
          placeholder={strings.PASSWORD_PLACEHOLDER}
          secureTextEntry={true}
        />
        <Button label={strings.LOGIN} onPress={handleLoginPress} />
        <Text>{message}</Text>
      </View>
    </View>
  );
};

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
