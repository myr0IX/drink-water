import { Stack } from "expo-router";

const LayoutRoot = () => {
  return <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="index" options={{ title: "Params", headerShown: true }} />
  </Stack>
}

export default LayoutRoot;