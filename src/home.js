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

export default function Home() {
  const navigation = useNavigation();
  const [newsData, setNewsData] = useState([]);

  const start = () => {
    navigation.navigate("Chat");
  };

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
