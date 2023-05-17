import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { firebase } from "../config";

export default function Home() {
  const navigation = useNavigation();
  const [newsData, setNewsData] = useState([]);
  const [userIDs, setUserIDs] = useState([]);

  const start = () => {
    if (userIDs.length > 0) {
      const filteredUserIDs = userIDs.filter(
        (id) => id !== firebase.auth().currentUser.uid
      );
      if (filteredUserIDs.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredUserIDs.length);
        const targetId = filteredUserIDs[randomIndex];
        navigation.navigate("Chat", { targetId });
      } else {
        console.log("No available user IDs (filteredUserIDs)"); // Tidak ada user ID yang tersedia setelah difilter
      }
    } else {
      console.log("No available user IDs"); // Tidak ada user ID yang tersedia
    }
  };

  useEffect(() => {
    const messageRef = firebase.database().ref("userId");
    const user = firebase.auth().currentUser;

    messageRef.on("value", (snapshot) => {
      const userIds = Object.keys(snapshot.toJSON());
      setUserIDs(userIds);

      if (userIds) {
        const userIdsWithoutMe = userIds.filter((id) => id !== user.uid);

        if (userIdsWithoutMe.length > 0) {
          let targetId = null;

          // Cek apakah kedua UID pengguna ada dalam daftar userIds
          const isUserInUserIds =
            userIdsWithoutMe.includes(user.uid) &&
            userIdsWithoutMe.includes(targetId);

          if (!isUserInUserIds) {
            console.log("No available user IDs (isUserInUserIds)"); // Pengguna saat ini tidak ada dalam daftar user IDs setelah difilter
            return;
          }

          const randomIndex = Math.floor(
            Math.random() * userIdsWithoutMe.length
          );
          targetId = userIdsWithoutMe[randomIndex];

          // Jika kedua pengguna sedang bekerja, cari ulang targetId
          if (userIds.length > 2) {
            let isTargetIdFound = false;

            while (!isTargetIdFound) {
              const newRandomIndex = Math.floor(
                Math.random() * userIdsWithoutMe.length
              );
              targetId = userIdsWithoutMe[newRandomIndex];

              if (
                targetId !== user.uid &&
                targetId !== targetId &&
                userIdsWithoutMe.includes(targetId)
              ) {
                isTargetIdFound = true;
              }
            }
          }

          console.log("array", targetId); // Menampilkan targetId yang ditemukan
        } else {
          console.log("No available user IDs (userIdsWithoutMe)"); // Tidak ada user ID yang tersedia setelah penghapusan user saat ini
        }
      } else {
        console.log("No available user IDs"); // Tidak ada user ID yang tersedia
      }
    });
  }, []);
  const fetchNews = async () => {
    try {
      const response = await axios.get(
        "https://newsapi.org/v2/everything?q=chat&apiKey=2cec721a651f4b1a80436877904cba3b"
      );
      const news = response.data.articles;
      return news;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const detail = (news) => {
    navigation.navigate("NewsDetail", {
      title: news.title,
      author: news.author,
      image: news.urlToImage,
      content: news.content,
      url: news.url,
    });
  };

  useEffect(() => {
    const getNews = async () => {
      const news = await fetchNews();
      setNewsData(news);
    };

    getNews();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.textHead}>
        Temukan Seseorang Anonim Untuk Mengobrol
      </Text>
      <TouchableOpacity style={styles.startBtn} onPress={start}>
        <Text style={styles.textBtn}>Mulai Cari</Text>
      </TouchableOpacity>
      <ScrollView
        style={styles.containerNews}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.headNewsContainer}>
          <Text style={styles.headNews}>News Today</Text>
        </View>
        <View style={styles.newsWrapper}>
          {newsData.map((news, index) => (
            <TouchableOpacity
              style={styles.textNews}
              onPress={() => detail(news)}
              key={index}
            >
              {news.urlToImage && (
                <Image source={{ uri: news.urlToImage }} style={styles.image} />
              )}
              <Text style={styles.headTextNews}>{news.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffd3b0",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  containerNews: {
    flex: 1,
    width: "100%",
    top: 30,
    backgroundColor: "#fff9de",
    borderRadius: 20,
  },
  newsWrapper: {
    paddingBottom: 50,
  },
  headNewsContainer: {
    width: "100%",
    marginBottom: 10,
    backgroundColor: "#fff9de",
    paddingVertical: 10,
    borderRadius: 20,
    paddingLeft: 40,
  },
  headNews: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textNews: {
    paddingTop: 12,
    paddingLeft: 40,
    paddingRight: 20,
    flexDirection: "row",
  },
  headTextNews: {
    fontSize: 15,
    width: 250,
    paddingLeft: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  textHead: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: 50,
    padding: 20,
  },
  startBtn: {
    width: 150,
    backgroundColor: "#a6d0dd",
    alignItems: "center",
    borderRadius: 10,
    padding: 20,
    elevation: 20,
  },
  textBtn: {
    fontSize: 20,
    color: "#FFF9DE",
    fontWeight: "bold",
  },
});
