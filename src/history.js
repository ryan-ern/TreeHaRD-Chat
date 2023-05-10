import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

const History = () => {
  const [history, setHistory] = useState([
    { id: 1, name: "Adli", message: "Assalamualaikum" },
    { id: 2, name: "Hans", message: "Oke siapp" },
    { id: 3, name: "Ryan", message: "Mantapp bro" },
    { id: 4, name: "Hadi", message: "Sini kumpul ngab" },
    { id: 5, name: "Hanif", message: "Okee bro" },
  ]);

  const renderChatItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.chatItem}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>{item.name.charAt(0)}</Text>
        </View>
        <View style={styles.chatDetails}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.message}>{item.message}</Text>
        </View>
        <Text style={styles.timestamp}>11:30 AM</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headContainer}>
        <Text style={styles.headText}>History Chat</Text>
      </View>
      <FlatList
        data={history}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.history}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff9de",
  },
  headContainer: {
    padding: 10,
    marginTop: 40,
    backgroundColor: "#a6d0dd",
  },
  headText: {
    fontSize: 20,
    textAlign: "center",
  },
  history: {
    padding: 10,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    margin: 10,
    backgroundColor: "#ffd3b0",
    borderRadius: 20,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#A6D0DD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  avatar: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#555",
  },
  chatDetails: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  message: {
    color: "#666",
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
    marginLeft: 10,
  },
});

export default History;
