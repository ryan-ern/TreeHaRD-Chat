import React, { useState, useEffect, useRef } from "react";
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
import { useNavigation, useRoute } from "@react-navigation/native";
import { firebase } from "../config";

const ChatScreen = () => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const [targetId, setTargetId] = useState(null);
  const flatListRef = useRef(null);

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
          onPress: async () => {
            // Reset targetId
            setTargetId(null);

            navigation.navigate("Home");
          },
        },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    const { targetId } = route.params;
    setTargetId(targetId);
  }, [route.params.targetId]);

  useEffect(() => {
    const messageRef = firebase.database().ref("chats");
    messageRef.on("value", (snapshot) => {
      const chatData = snapshot.val();
      if (chatData) {
        const messages = Object.values(chatData);
        setChatMessages(messages);
      } else {
        setChatMessages([]);
      }
    });

    return () => {
      // Hapus listener saat komponen unmount
      messageRef.off();
    };
  }, []);

  const scrollToBottom = () => {
    if (flatListRef.current && chatMessages.length > 0) {
      flatListRef.current.scrollToIndex({
        index: chatMessages.length - 1,
        animated: true,
      });
    }
  };

  useEffect(() => {
    const messageRef = firebase.database().ref("chats");
    messageRef.limitToLast(1).on("child_added", (snapshot) => {
      const lastMessage = snapshot.val();
      scrollToBottom();
    });

    return () => {
      // Hapus listener saat komponen unmount
      messageRef.off();
    };
  }, []);

  const handleSendMessage = () => {
    const user = firebase.auth().currentUser;
    if (user) {
      const messageRef = firebase.database().ref("chats");
      const newMessageRef = messageRef.push();
      const messageBody = {
        senderId: user.uid,
        targetId: targetId,
        message: message,
      };
      newMessageRef.set(messageBody);
      console.log(messageBody);
      setMessage("");
    }
  };

  const renderChatMessage = ({ item }) => {
    const currentUser = firebase.auth().currentUser;
    const isCurrentUserSender = item.senderId === currentUser.uid;
    const isCurrentUserTarget = item.targetId === currentUser.uid;

    // Cek apakah pengguna saat ini adalah pengirim atau penerima dan berada dalam percakapan pada kedua ID tersebut
    const isCurrentUserInConversation =
      (isCurrentUserSender && item.targetId === targetId) ||
      (isCurrentUserTarget && item.senderId === targetId);

    // Hanya menampilkan pesan jika pengguna saat ini adalah pengirim atau penerima dan berada dalam percakapan pada kedua ID tersebut
    if (isCurrentUserInConversation) {
      return (
        <View
          style={
            isCurrentUserSender
              ? styles.myMessageContainer
              : styles.otherMessageContainer
          }
        >
          <Text style={styles.messageText}>{item.message}</Text>
        </View>
      );
    }

    return null;
  };

  // ...

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
        ref={flatListRef}
        data={chatMessages}
        renderItem={renderChatMessage}
        keyExtractor={(item, index) => index.toString()}
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
