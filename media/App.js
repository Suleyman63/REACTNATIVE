import { StatusBar } from "expo-status-bar";
import React, { useRef, useState, useEffect } from "react";
import {
  Alert,
  Button,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "./components/Header";
import BottomSheet from "reanimated-bottom-sheet";
import * as ImagePicker from "expo-image-picker";
​
export default function App() {
  const [image, setImage] = useState(
    "https://images.unsplash.com/photo-1636309311589-68e0d689fc07?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=867&q=80"
  );
  const refSheet = useRef();
​
  const toggleSheet = (index) => {
    refSheet.current.snapTo(index);
  };
​
  const renderContent = () => (
    <View style={styles.sheetContent}>
      <View style={styles.titles}>
        <Text style={styles.title}>Upload Logo</Text>
        <Text style={styles.subTitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={takePhotoFromCamera}>
        <Text style={styles.buttonText}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={takePhotoFromLibrary}>
        <Text style={styles.buttonText}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ ...styles.button, backgroundColor: "gray" }}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
  const renderHeader = () => (
    <View style={styles.headerContent}>
      <View style={styles.headerButton}></View>
    </View>
  );
​
  const takePhotoFromCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
​
  const takePhotoFromLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });
​
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
​
  useEffect(async () => {
    if (Platform.OS === "web") return;
​
    // Mevcut izinleri kontrol eder
    const { granted } = await ImagePicker.getCameraPermissionsAsync();
    const { accessPrivileges } =
      await ImagePicker.getMediaLibraryPermissionsAsync();
​
    //İzin alınmamışsa kamera kullanımı için izin ister
    if (!granted) {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Kamera kullanımı zorunludur");
      }
    }
​
    //İzin alınmamışsa galeri kullanımı için izin ister
    if (accessPrivileges !== "all") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
​
      if (status !== "granted") {
        Alert.alert("Galeri kullanımı zorunludur");
      }
    }
  }, []);
​
  return (
    <>
      <View style={styles.container}>
        <View style={styles.buttons}>
          <Button title="Open" color="green" onPress={() => toggleSheet(0)} />
          <Button title="Close" color="red" onPress={() => toggleSheet(1)} />
        </View>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
​
      <BottomSheet
        ref={refSheet}
        enabledContentGestureInteraction={false}
        snapPoints={[310, 50]} //ilk değer bottom sheet in açık olduğu pozisyon, ikinci değer kapalı olduğu pozisyon
        initialSnap={1} //bottom sheet in ilk pozisyonunu berliler. snapPoints dizindeki index değerlerinden birini alır
        renderContent={renderContent}
        renderHeader={renderHeader}
      />
    </>
  );
}
​
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "powderblue",
    paddingTop: 50,
  },
  buttons: {
    width: "100%",
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginBottom: 10,
  },
  sheetContent: {
    backgroundColor: "white",
    padding: 20,
  },
  titles: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
  },
  subTitle: {
    fontSize: 12,
    color: "gray",
  },
  button: {
    backgroundColor: "tomato",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  headerContent: {
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerButton: {
    margin: 10,
    width: 100,
    height: 5,
    backgroundColor: "tomato",
    borderRadius: 5,
    elevation: 2,
  },
  image: {
    width: "90%",
    height: 400,
  },
});