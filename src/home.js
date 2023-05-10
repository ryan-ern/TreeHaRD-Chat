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

export default function Home() {
  const navigation = useNavigation();
  const start = () => {
    navigation.navigate("Chat");
  };
  const detail = () => {
    navigation.navigate("NewsDetail", {
      title: "PAN Klaim Diajak PDIP Usung Ganjar di Pilpres 2024",
      author: "Penulis Berita",
      image:
        "https://akcdn.detik.net.id/visual/2019/05/04/671d0acf-5104-4c2a-bee2-ace611b5402c_169.jpeg?w=650&q=90",
      content:
        "Eddy mengatakan ajakan itu disampaikan oleh Sekjen PDIP Hastro Kristiyanto setelah pengumuman Ganjar sebagai kandidat calon presiden dari partai berlambang banteng itu. Ketika kemarin Mas Ganjar ditetapkan sebagai capres, saya hubungi mas Hasto, kita ada dialog, 'Gimana kali ini PAN, ayo gabung sama PDIP untk mengusung capres yang sama'. Kurang lebih seperti itu kata-katanya,",
    });
  };
  const imageUrl =
    "https://akcdn.detik.net.id/visual/2019/05/04/671d0acf-5104-4c2a-bee2-ace611b5402c_169.jpeg?w=650&q=90";
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
          <TouchableOpacity style={styles.textNews} onPress={detail}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <Text style={styles.headTextNews}>
              PAN Klaim Diajak PDIP Usung Ganjar di Pilpres 2024
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textNews}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <Text style={styles.headTextNews}>
              PAN Klaim Diajak PDIP Usung Ganjar di Pilpres 2024
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textNews}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <Text style={styles.headTextNews}>
              PAN Klaim Diajak PDIP Usung Ganjar di Pilpres 2024
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textNews}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <Text style={styles.headTextNews}>
              PAN Klaim Diajak PDIP Usung Ganjar di Pilpres 2024
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textNews}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <Text style={styles.headTextNews}>
              PAN Klaim Diajak PDIP Usung Ganjar di Pilpres 2024
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textNews}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <Text style={styles.headTextNews}>
              PAN Klaim Diajak PDIP Usung Ganjar di Pilpres 2024
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textNews}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <Text style={styles.headTextNews}>
              PAN Klaim Diajak PDIP Usung Ganjar di Pilpres 2024
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textNews}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <Text style={styles.headTextNews}>
              PAN Klaim Diajak PDIP Usung Ganjar di Pilpres 2024
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textNews}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <Text style={styles.headTextNews}>
              PAN Klaim Diajak PDIP Usung Ganjar di Pilpres 2024
            </Text>
          </TouchableOpacity>
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
  },
  textBtn: {
    fontSize: 15,
    color: "#FFF9DE",
  },
});
