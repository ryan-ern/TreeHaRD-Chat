import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { Feather, SimpleLineIcons } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";

const ChatScreen = () => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const navigation = useNavigation();

  const navigateBack = () => {
    navigation.navigate("History");
  };

  const closeSession = () => {
    Alert.alert(
      "Konfirmasi",
      "Anda Yakin Ingin Mengakhiri Sesi?",
      [
        {
          text: "Tidak",
        },
        {
          text: "Ya",
          onPress: () => navigation.navigate("Home"),
        },
      ],
      { cancelable: true }
    );
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const newMessage = {
        id: chatMessages.length + 1,
        text: message,
        sender: "Me",
      };
      setChatMessages([...chatMessages, newMessage]);
      setMessage("");
    }
  };

  const renderChatMessage = ({ item }) => (
    <View
      style={
        item.sender === "Me"
          ? styles.myMessageContainer
          : styles.otherMessageContainer
      }
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.menuChat}>
        <TouchableOpacity onPress={navigateBack} style={styles.backBtn}>
          <Feather name="arrow-left-circle" size={25} color={"#000"} />
        </TouchableOpacity>
        <View style={styles.iconUserWrapper}>
          <SimpleLineIcons name="user" size={25} style={styles.iconUser} />
        </View>
      </View>
      <TouchableOpacity onPress={closeSession} style={styles.closeBtn}>
        <SimpleLineIcons name="close" size={25} color={"#000"} />
      </TouchableOpacity>
      <FlatList
        data={chatMessages}
        renderItem={renderChatMessage}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.chatContainer}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ketik Pesan..."
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Feather name="send" size={20} color={"#000"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.recordAudio}
          onPress={handleSendMessage}
        >
          <Feather name="mic" size={20} color={"#000"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff9de",
  },
  backBtn: {
    alignSelf: "flex-start",
  },
  closeBtn: {
    alignSelf: "flex-end",
    paddingRight: 10,
    top: 4,
    marginBottom: 15,
  },
  menuChat: {
    top: 40,
    flexDirection: "row",
    padding: 10,
    width: "100%",
    backgroundColor: "#a6d0dd",
  },
  iconUserWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconUser: {
    alignSelf: "center",
  },
  chatContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 10,
  },
  myMessageContainer: {
    alignSelf: "flex-end",
    backgroundColor: "#ffd3b0",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 4,
    maxWidth: "75%",
  },
  otherMessageContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#ff6969",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 4,
    maxWidth: "75%",
  },
  messageText: {
    fontSize: 16,
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#ffd3b0",
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 12,
    marginRight: 10,
    backgroundColor: "#a6d0dd",
  },
  recordAudio: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#fff9de",
    borderRadius: 20,
  },
  sendButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#a6d0dd",
    marginLeft: -55,
    borderRadius: 20,
    marginRight: 10,
  },
});

export default ChatScreen;
