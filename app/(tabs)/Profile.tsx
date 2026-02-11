import Colors from "@/services/Colors";
import { axiosClient } from "@/services/GlobalApi";
import { useAuth, useUser } from "@clerk/clerk-expo";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, Share, StyleSheet, Text, View } from "react-native";
// or "@clerk/clerk-react" for web

export default function Profile() {
  const { user } = useUser();
  const userId = user?.id;
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut({ redirectUrl: "/" });
  };

  useEffect(() => {
    handleProfileDetails();
  }, []);

  const handleProfileDetails = async () => {
    const response = await axiosClient.get(
      "/user-lists?.filters[id][$eq]=" + userId,
    );
    const email = response?.data.data;
    setUserEmail(email[0].email);

    console.log(email[0].email);
  };

  const onShareClick = async () => {
    const result = await Share.share({
      message:
        "Check Out This Business App. \n" +
        "Business Name: Business Directory App",
    });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          height: 200,
          backgroundColor: Colors.PRIMARY,
          position: "absolute",
        }}
      ></View>

      <View style={styles.container1}>
        <View style={styles.userDetails}>
          <Image
            source={{ uri: user?.imageUrl }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 99,
            }}
          />
          <View style={{ flex: 1, flexDirection: "column" }}>
            <Text style={{ fontSize: 20 }}>{user?.fullName}</Text>
            <Text style={{ fontSize: 20, color: "gray" }}>{userEmail}</Text>
          </View>
        </View>

        <View style={styles.container2}>
          <Pressable
            onPress={() => router.push("/Explore")}
            style={styles.button}
          >
            <MaterialIcons
              style={styles.icon}
              name="explore"
              size={24}
              color="black"
            />
            <Text style={styles.buttonText}>Explore</Text>
            <AntDesign
              style={styles.icon1}
              name="arrow-right"
              size={24}
              color="black"
            />
          </Pressable>

          <Pressable
            onPress={() => router.push("/Favorite")}
            style={styles.button}
          >
            <MaterialIcons
              style={styles.icon}
              name="favorite"
              size={24}
              color="black"
            />
            <Text style={styles.buttonText}>Favorite</Text>
            <AntDesign
              style={styles.icon1}
              name="arrow-right"
              size={24}
              color="black"
            />
          </Pressable>

          <Pressable onPress={() => onShareClick()} style={styles.button}>
            <MaterialIcons
              style={styles.icon}
              name="share"
              size={24}
              color="black"
            />
            <Text style={styles.buttonText}>Share</Text>
            <AntDesign
              style={styles.icon1}
              name="arrow-right"
              size={24}
              color="black"
            />
          </Pressable>

          <Pressable onPress={() => router.push("/")} style={styles.button}>
            <MaterialIcons
              style={styles.icon}
              name="local-phone"
              size={24}
              color="black"
            />
            <Text style={styles.buttonText}>Contact Us</Text>
            <AntDesign
              style={styles.icon1}
              name="arrow-right"
              size={24}
              color="black"
            />
          </Pressable>

          <Pressable onPress={handleLogout} style={styles.button}>
            <MaterialIcons
              style={styles.icon}
              name="logout"
              size={24}
              color="red"
            />
            <Text style={[styles.buttonText, { color: "red" }]}>Logout</Text>
            <AntDesign
              style={styles.icon1}
              name="arrow-right"
              size={24}
              color="red"
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  container1: {
    margin: 20,
  },

  userDetails: {
    flex: 1,
    flexDirection: "row",
    gap: 20,
    backgroundColor: Colors.WHITE,
    padding: 20,
    borderRadius: 15,
    marginVertical: 20,
  },
  container2: {
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  icon: {
    padding: 10,
    backgroundColor: "rgba(128, 128, 128, 0.3)",
    borderRadius: 15,
  },
  icon1: {
    color: "rgba(128, 128, 128, 0.5)",
  },
  buttonText: {
    color: "black",
    fontSize: 20,
  },
});
