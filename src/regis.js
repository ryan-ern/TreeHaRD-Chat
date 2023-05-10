import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Regis = () => {
  const [nama, setName] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const navigation = useNavigation();

  const handleRegister = () => {
    navigation.navigate("TabNavigator");
  };
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/Logo-2.png")} />

      <Text style={styles.title}>REGISTER</Text>

      <TextInput
        style={styles.input}
        placeholder="Nama"
        value={nama}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Jenis Kelamin"
        value={gender}
        onChangeText={setGender}
      />

      <TextInput
        style={styles.input}
        placeholder="bio"
        value={bio}
        onChangeText={setBio}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff9de",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
});
export default Regis;
