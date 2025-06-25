import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Stack, usePathname, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function NavLayout() {
  const router = useRouter();
  const path = usePathname();

  return (
    <>
      <Stack screenOptions={{ headerShown: true }} />

      <View style={styles.navbar}>
        <TouchableOpacity
        onPress={() =>
            path !== "/(auth)/(nav)/ecoPoint" && router.push("/(auth)/(nav)/ecoPoint")
          }
        >
          <Ionicons name="wallet-outline" size={30} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
        onPress={() =>
            path !== "/(auth)/(nav)/profile" && router.push("/(auth)/(nav)/profile")
          }
        >
          <MaterialIcons name="edit" size={30} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
        onPress={() =>
            path !== "/(auth)/(nav)/home" && router.push("/(auth)/(nav)/home")
          }>
          <View style={styles.navCenter}>
            <Ionicons name="home" size={30} color="#fff" />
            <Text style={styles.navCenterText}>Home</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={() =>
            path !== "/(auth)/(nav)/leaderboard" && router.push("/(auth)/(nav)/leaderboard")
          }
        >
          <Ionicons name="bar-chart-outline" size={30} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            path !== "/(auth)/settings" && router.push("/(auth)/settings")
          }
        >
          <Ionicons name="settings-outline" size={30} color="#000" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  navbar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  navCenter: {
    backgroundColor: "#22C55E",
    padding: 12,
    borderRadius: 300,
    alignItems: "center",
  },
  navCenterText: {
    color: "#fff",
    fontSize: 10,
  },
});