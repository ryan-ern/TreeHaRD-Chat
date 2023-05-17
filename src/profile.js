import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { FontAwesome } from "react-native-vector-icons";
import { Calendar } from "react-native-calendars";
import { firestore, firebase } from "../config";

function ProfileScreen() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState(" ");
  const [Bio, setBio] = useState(" ");
  const [note, setNote] = useState("");
  const [editing, setEditing] = useState(false);
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const [isCalendarModalVisible, setCalendarModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);

  function toggleCalendarModal() {
    setCalendarModalVisible(!isCalendarModalVisible);
  }

  useEffect(() => {
    getAccountData();
  }, []);

  const getAccountData = async () => {
    try {
      const user = firebase.auth().currentUser;
      const accountRef = firestore.collection("accounts").doc(user.uid);
      const accountSnapshot = await accountRef.get();

      if (accountSnapshot.exists) {
        const accountData = accountSnapshot.data();
        setName(accountData.name);
        setGender(accountData.gender);
        setBio(accountData.bio);
        setNote(accountData.note);
      } else {
        console.log("Account does not exist");
      }
    } catch (error) {
      console.log("Error getting account data: ", error);
    }
  };

  function handleEditProfile() {
    setEditModalVisible(true);
  }

  const handleSaveProfile = async () => {
    try {
      const user = firebase.auth().currentUser;
      const accountRef = firestore.collection("accounts").doc(user.uid);

      // Update data pada dokumen akun
      await accountRef.update({
        name: name,
        gender: gender,
        bio: Bio,
        note: note,
      });

      alert("Profile updated successfully!");
      setEditModalVisible(false);
    } catch (error) {
      alert("Error updating profile: ", error);
    }
  };

  function toggleEditModal() {
    setEditModalVisible(!isEditModalVisible);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.containerProfile}>
          {!editing && (
            <TouchableOpacity
              onPress={handleEditProfile}
              style={styles.editButton}
            >
              <FontAwesome name="edit" size={25} color={"#3d3d3d"} />
            </TouchableOpacity>
          )}
          <Text style={styles.name}>{name}</Text>
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4wdTmZ9xZLBleRVhe7weMhdq-HuuvcMVdUg&usqp=CAU",
            }}
            style={styles.avatar}
          />
          <Text style={styles.gender}>{gender}</Text>
          <Text style={styles.Bio}>{Bio}</Text>
        </View>
        <View style={styles.noteContainer}>
          <View style={styles.headerNoteContainer}>
            <Text style={styles.headerNote}>Note:</Text>
            <FontAwesome name="sticky-note" size={25} color={"#3d3d3d"} />
          </View>
          <Text style={styles.note}>{note}</Text>
        </View>
        <View style={styles.calenderContainer}>
          <View style={styles.headerCalenderContainer}>
            <Text style={styles.headerCalender}>Kalender:</Text>
            <TouchableOpacity onPress={toggleCalendarModal}>
              <FontAwesome name="calendar" size={25} color={"#3d3d3d"} />
            </TouchableOpacity>
          </View>
          <Text style={styles.calender}>{formattedDate}</Text>
        </View>
      </View>

      <Modal
        isVisible={isEditModalVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={toggleEditModal}
              style={styles.closeButton}
            >
              <FontAwesome name="close" size={20} color={"#3d3d3d"} />
            </TouchableOpacity>
            <Text style={styles.heading}>Edit Profile</Text>
            <Text style={styles.label}>Nama</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Name"
            />
            <Text style={styles.label}>Jenis Kelamin</Text>
            <TextInput
              style={styles.input}
              value={gender}
              onChangeText={setGender}
              placeholder="Gender"
            />
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={styles.input}
              value={Bio}
              onChangeText={setBio}
              placeholder="Bio"
            />
            <Text style={styles.label}>Note</Text>
            <TextInput
              style={styles.input}
              value={note}
              onChangeText={setNote}
              placeholder="Note"
            />
            <TouchableOpacity onPress={handleSaveProfile}>
              <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        isVisible={isCalendarModalVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={toggleCalendarModal}
              style={styles.closeButton}
            >
              <FontAwesome name="close" size={20} color={"#3d3d3d"} />
            </TouchableOpacity>
            <Text style={styles.heading}>Kalender</Text>
            <Calendar />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff9de",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    backgroundColor: "#ff6969",
    marginTop: "10%",
    width: "100%",
    height: "50%",
  },
  containerProfile: {
    position: "relative",
    width: "80%",
    backgroundColor: "#ffd3b0",
    borderRadius: 10,
    padding: 10,
    marginBottom: "-40%",
    marginTop: "10%",
    alignSelf: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginBottom: 30,
  },
  name: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  gender: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  Bio: {
    fontSize: 15,
    marginBottom: 10,
    textAlign: "center",
  },
  noteContainer: {
    width: "80%",
    top: "45%",
    backgroundColor: "#ffd3b0",
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerNoteContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerNote: {
    fontSize: 15,
    alignSelf: "flex-start",
    fontWeight: "bold",
  },
  note: {
    fontSize: 15,
    alignSelf: "flex-start",
    marginLeft: 15,
  },
  calenderContainer: {
    width: "80%",
    top: "45%",
    backgroundColor: "#ffd3b0",
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerCalenderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerCalender: {
    fontSize: 15,
    alignSelf: "flex-start",
    fontWeight: "bold",
  },
  calender: {
    fontSize: 20,
    alignSelf: "center",
    marginLeft: 15,
    fontWeight: "bold",
  },
  editButton: {
    fontSize: 20,
    color: "blue",
    alignSelf: "flex-end",
    marginRight: 10,
    marginTop: 5,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#A6D0DD",
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: -10,
  },
  saveButton: {
    fontSize: 18,
    color: "blue",
    marginTop: 20,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    width: "100%",
  },
  closeButton: {
    position: "absolute",
    top: 5,
    right: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: "blue",
  },
});

export default ProfileScreen;
