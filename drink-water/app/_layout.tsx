import { Feather } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Water Tracker",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/params")}
            >
              <Feather name="settings" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});
