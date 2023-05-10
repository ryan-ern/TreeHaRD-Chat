import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

function ProfileScreen() {
  const [name, setName] = useState("Nama Lengkap");
  const [gender, setGender] = useState("Jenis Kelamin");
  const [biodata, setBiodata] = useState("Bio");
  const [note, setNote] = useState("Note:");
  const [editing, setEditing] = useState(false);

  function handleNameChange(text) {
    setName(text);
  }

  function handleGenderChange(text) {
    setGender(text);
  }

  function handleBiodataChange(text) {
    setBiodata(text);
  }

  function handleNoteChange(text) {
    setNote(text);
  }

  function handleEditProfile() {
    setEditing(true);
  }

  function handleSaveProfile() {
    setEditing(false);
    alert("Profile Updated!");
  }

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.profile}>
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4wdTmZ9xZLBleRVhe7weMhdq-HuuvcMVdUg&usqp=CAU",
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.gender}>{gender}</Text>
        <Text style={styles.biodata}>{biodata}</Text>
        <Text style={styles.note}>{note}</Text>
        {!editing && (
          <TouchableOpacity onPress={handleEditProfile}>
            <Text style={styles.editButton}>Edit Profile</Text>
          </TouchableOpacity>
        )}
      </View>
      </View>
      
      {editing && (
        <View style={styles.editForm}>
          <Text style={styles.heading}>Edit Profile</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={handleNameChange}
            placeholder="Name"
          />
          <TextInput
            style={styles.input}
            value={gender}
            onChangeText={handleGenderChange}
            placeholder="Gender"
          />
          <TextInput
            style={styles.input}
            value={biodata}
            onChangeText={handleBiodataChange}
            placeholder="Biodata"
          />
          <TextInput
            style={styles.input}
            value={note}
            onChangeText={handleNoteChange}
            placeholder="Note"
          />
          <TouchableOpacity onPress={handleSaveProfile}>
            <Text style={styles.saveButton}>Save</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: "#FFD3B0",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: 400,
    height: 200,
    backgroundColor: 'red',
    borderRadius: 10,
  },
  profile: {
    alignItems: "center",
    margin: 50,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginBottom: 30,
  },
  name: {
    fontSize: 20,
    marginBottom: 10,
  },
  gender: {
    fontSize: 20,
    marginBottom: 10,
  },
  biodata: {
    fontSize: 20,
    marginBottom: 10,
  },
  note: {
    fontSize: 20,
  },
  editButton: {
    fontSize: 20,
    color: "blue",
  },
  editForm: {
    alignItems: "center",
    marginTop: 10,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 40,
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: "#A6D0DD",
  },
  saveButton: {
    fontSize: 18,
    color: "blue",
    marginTop: 20,
  },
});

export default ProfileScreen;
