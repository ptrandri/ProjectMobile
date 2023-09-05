import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../routes/Stack";
import colors from "../config/colors";

const Home = () => {
  const navigation = useNavigation<StackTypes>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Project App</Text>
      <Button
        label="Login"
        onPress={() => {
          navigation.navigate("Login");
        }}
      />
      <Button
        label="Register"
        onPress={() => {
          navigation.navigate("Register");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.DODGER_BLUE,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: colors.DODGER_BLUE,
  },
});

export default Home;
