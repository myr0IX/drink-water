import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

// Les clés et les valeurs par défaut sont bien définies à l'extérieur
const STORAGE_KEYS = {
  WATER: "water",
  DAILY_GOAL: "dailyGoal",
};

const DEFAULT_WATER = 0;
const DEFAULT_DAILY_GOAL = 2000;

export const parseStoredValue = (
  value: string | null,
  fallback: number
): number => {
  if (value === null) {
    return fallback;
  }
  const parsedValue = parseInt(value, 10);
  return isNaN(parsedValue) ? fallback : parsedValue;
};

const useWaterHandler = () => {
  const [water, setWater] = useState(DEFAULT_WATER);
  const [dailyGoal, setDailyGoal] = useState(DEFAULT_DAILY_GOAL);
  const [isLoading, setIsLoading] = useState(true);

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      const [savedWater, savedGoal] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.WATER),
        AsyncStorage.getItem(STORAGE_KEYS.DAILY_GOAL),
      ]);

      // On utilise notre nouvelle fonction de parsage sécurisée
      const initialWater = parseStoredValue(savedWater, DEFAULT_WATER);
      const initialGoal = parseStoredValue(savedGoal, DEFAULT_DAILY_GOAL);

      setWater(initialWater);
      setDailyGoal(initialGoal);

      // On s'assure que le stockage a bien les valeurs par défaut si c'est le premier lancement
      if (savedWater === null) {
        await AsyncStorage.setItem(STORAGE_KEYS.WATER, initialWater.toString());
      }
      if (savedGoal === null) {
        await AsyncStorage.setItem(
          STORAGE_KEYS.DAILY_GOAL,
          initialGoal.toString()
        );
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
      setWater(DEFAULT_WATER);
      setDailyGoal(DEFAULT_DAILY_GOAL);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const refreshData = useCallback(() => {
    loadInitialData();
  }, []);

  const addWater = useCallback(async (amount: number) => {
    setWater((currentWater) => {
      const newWater = currentWater + amount;
      AsyncStorage.setItem(STORAGE_KEYS.WATER, newWater.toString()).catch(
        (error) => console.error("Erreur de sauvegarde (water):", error)
      );
      return newWater;
    });
  }, []);

  const resetWater = useCallback(async () => {
    setWater(DEFAULT_WATER);
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.WATER, DEFAULT_WATER.toString());
    } catch (error) {
      console.error("Erreur lors du reset (water):", error);
    }
  }, []);

  const updateDailyGoal = useCallback(
    async (goal: number) => {
      setIsLoading(true);
      console.log("updateDailyGoal", goal);
      setDailyGoal(goal);
      try {
        await AsyncStorage.setItem(STORAGE_KEYS.DAILY_GOAL, goal.toString());
      } catch (error) {
        console.error("Erreur de sauvegarde (dailyGoal):", error);
      } finally {
        setIsLoading(false);
      }
    },
    [setDailyGoal]
  );

  const deleteData = useCallback(async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.WATER),
        AsyncStorage.removeItem(STORAGE_KEYS.DAILY_GOAL),
      ]);
      setWater(DEFAULT_WATER);
      setDailyGoal(DEFAULT_DAILY_GOAL);
    } catch (error) {
      console.error("Erreur lors de la suppression des données:", error);
    }
  }, []);

  return {
    water,
    dailyGoal,
    isLoading,
    addWater,
    resetWater,
    updateDailyGoal,
    deleteData,
    refreshData,
  };
};

export default useWaterHandler;
