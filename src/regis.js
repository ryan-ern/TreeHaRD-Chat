import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth, firestore } from "../config";

const Regis = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [note, setNote] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const handleRegister = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Membuat referensi koleksi 'accounts' di Firestore
        const accountsCollection = firestore.collection("accounts");
        // Menambahkan dokumen baru dengan ID pengguna
        accountsCollection
          .doc(user.uid)
          .set({
            name: name,
            gender: gender,
            note: note,
            bio: bio,
          })
          .then(() => {
            // Registrasi berhasil, navigasikan ke layar yang diinginkan
            navigation.navigate("Login");
          })
          .catch((error) => {
            // Tangani kesalahan penyimpanan data
            alert("Failed to save account data", error);
          });
      })
      .catch((error) => {
        // Tangani kesalahan registrasi
        alert("Registration failed", error);
        console.log(error);
      });
  };

  // useEffect(() => {
  //   const messageRef = firebase.database().ref("chats");
  //   messageRef.limitToLast(1).on("child_added", (snapshot) => {
  //     const lastMessage = snapshot.val();
  //     console.log(lastMessage);
  //   });
  // });

  // const send = () => {
  // const user = firebase.auth().currentUser;
  // const uid = "IPrawPkTIIbobAbFHUiJUy85mOv1";
  // const messageRef = firebase.database().ref("chats");
  // const newMessageRef = messageRef.push();
  // const databaseRef = firebase.database().ref("users");
  // databaseRef
  //   .child(uid)
  //   .once("value")
  //   .then((snapshot) => {
  //     const user = snapshot.val();
  //     console.log(user);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // newMessageRef.set({
  //   text: "last",
  //   timestamp: "123",
  // sender: firebase.database().ref(uid),
  // });
  // };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/Logo-2.png")} />
      <Text style={styles.title}>REGISTER</Text>
      <TextInput
        style={styles.input}
        placeholder="Nama"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Jenis Kelamin"
        value={gender}
        onChangeText={setGender}
      />
      <TextInput
        style={styles.input}
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
      />
      <TextInput
        style={styles.input}
        placeholder="Note/Status"
        value={note}
        onChangeText={setNote}
      />
      <TouchableOpacity style={styles.mainButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Are you Registered? Let's Login</Text>
        </TouchableOpacity>
      </View>
      {/* <Text style={styles.or}>Or</Text>
      <Button title="Send Messages" onPress={send} /> */}
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
  mainButton: {
    backgroundColor: "#a6d0de",
    width: "80%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
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
