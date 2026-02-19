import useWaterHandler from "@/hooks/use-water-handler";
import { useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

function Index() {
  const { water, addWater, resetWater, dailyGoal, isLoading, refreshData } =
    useWaterHandler();

  useFocusEffect(refreshData);

  if (isLoading) {
    return <Text>Chargement...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suivi d&apos;eau 💧</Text>
      <Text style={styles.counter}>{water} ml</Text>
      {!isLoading && (
        <Text style={styles.goal}>
          Objectif : {dailyGoal} ml ({Math.round((water / dailyGoal) * 100)}%)
        </Text>
      )}
      <View style={styles.buttons}>
        <Button title="+200ml" onPress={() => addWater(200)} />
        <Button title="+500ml" onPress={() => addWater(500)} />
      </View>
      <Button title="Réinitialiser" color="red" onPress={resetWater} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E6F7FF",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  counter: {
    fontSize: 40,
    marginBottom: 10,
  },
  goal: {
    fontSize: 18,
    marginBottom: 30,
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
});

export default Index;
