import { DeleteDataButton } from "@/components/delete-data-modale";
import useWaterHandler, { parseStoredValue } from "@/hooks/use-water-handler";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";

function Index() {
  const { updateDailyGoal, dailyGoal } = useWaterHandler();
  const [inputValue, setInputValue] = useState(dailyGoal.toString());
  const [hasError, setHasError] = useState(false);

  // Update local input when dailyGoal changes from external sources
  React.useEffect(() => {
    setInputValue(dailyGoal.toString());
  }, [dailyGoal]);

  const handleInputChange = (text: string) => {
    setInputValue(text);
    // Clear error when user starts typing
    if (hasError) {
      setHasError(false);
    }
  };

  const handleInputBlur = () => {
    const numericValue = parseStoredValue(inputValue, dailyGoal);

    // Validate input
    if (numericValue < 500 || numericValue > 5000) {
      setHasError(true);
      setInputValue(dailyGoal.toString()); // Reset to current valid value
      return;
    }

    // Only update if value actually changed
    if (numericValue !== dailyGoal) {
      updateDailyGoal(numericValue);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        gap: 15,
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", color: "#2c3e50" }}>
        Objectif journalier
      </Text>

      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 16, color: "#7f8c8d", marginBottom: 5 }}>
          Quantité d&apos;eau en ml (500-5000 ml)
        </Text>

        <TextInput
          keyboardType="numeric"
          value={inputValue}
          onChangeText={handleInputChange}
          onBlur={handleInputBlur}
          onSubmitEditing={handleInputBlur}
          placeholder="Ex: 2000"
          placeholderTextColor="#bdc3c7"
          accessibilityLabel="Objectif journalier d'eau en millilitres"
          accessibilityHint="Entrez une valeur entre 500 et 5000 millilitres"
          style={{
            width: "100%",
            borderWidth: 2,
            borderColor: hasError ? "#e74c3c" : "#3498db",
            backgroundColor: "#ffffff",
            padding: 15,
            borderRadius: 12,
            fontSize: 18,
            fontWeight: "500",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        />

        {hasError && (
          <Text style={{ color: "#e74c3c", fontSize: 14, marginTop: 5 }}>
            ⚠️ Veuillez entrer une valeur entre 500 et 5000 ml
          </Text>
        )}
      </View>

      <DeleteDataButton />
    </View>
  );
}

export default Index;
