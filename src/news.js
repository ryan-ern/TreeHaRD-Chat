import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Feather } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";

const NewsDetail = ({ route }) => {
  const { title, author, image, content } = route.params;
  const navigation = useNavigation();

  const navigateBack = () => {
    navigation.navigate("Home");
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.button} onPress={navigateBack}>
          <Feather name="arrow-left-circle" size={25} color={"#000"} />
        </TouchableOpacity>
        <Text style={styles.textHeader}>News Detail</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.newsContainer}>
          <Text style={styles.title}>{title}</Text>
          <Image source={{ uri: image }} style={styles.image} />
          <Text style={styles.author}>By {author}</Text>
          <Text style={styles.content}>{content}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff9de",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  textHeader: {
    fontSize: 20,
    textAlign: "right",
  },
  button: {
    marginRight: 10,
  },
  newsContainer: {
    marginTop: 20,
  },
  image: {
    width: "100%",
    height: 320,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  author: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 10,
  },
  content: {
    fontSize: 18,
    lineHeight: 28,
  },
});

export default NewsDetail;
