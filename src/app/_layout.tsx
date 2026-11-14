
import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
} from "react-native";

import { initializeDatabase } from "../lib/database";

export default function RootLayout() {
  const [isDatabaseReady, setIsDatabaseReady] = useState(false);
  const [databaseError, setDatabaseError] = useState("");

  useEffect(() => {
    async function setupDatabase() {
      try {
        await initializeDatabase();
        setIsDatabaseReady(true);
      } catch (error) {
        console.error("SQLite initialization error:", error);
        setDatabaseError("Unable to initialize local database.");
      }
    }

    setupDatabase();
  }, []);

  if (databaseError) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{databaseError}</Text>
      </View>
    );
  }

  if (!isDatabaseReady) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#7CC9E0" />
        <Text style={styles.loading}>
          Preparing DIGI DIARY...
        </Text>
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="index" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="forgotpass" />

      <Stack.Screen name="workNotes" />
      <Stack.Screen name="allNotes" />
      <Stack.Screen name="PersonalNotes" />
      <Stack.Screen name="SchoolNotes" />

      <Stack.Screen name="calendar" />
      <Stack.Screen name="trash" />

      <Stack.Screen name="addNotes" />
      <Stack.Screen name="categoriesModal" />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EAF8FC",
  },

  loading: {
    marginTop: 12,
    fontSize: 14,
    color: "#08284F",
  },

  error: {
    color: "red",
    fontSize: 15,
    textAlign: "center",
    padding: 20,
  },
});
