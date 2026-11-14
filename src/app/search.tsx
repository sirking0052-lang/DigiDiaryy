import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Sidebar from "../components/sideBar";

type Note = { id: string; title: string; category: string; createdAt: Date };

// sample data. Replace with your real notes once they're shared between screens
const SAMPLE_NOTES: Note[] = [
  {
    id: "1",
    title: "Went to the park",
    category: "Personal",
    createdAt: new Date(2026, 9, 12, 15, 49),
  },
  {
    id: "2",
    title: "Project proposal",
    category: "School",
    createdAt: new Date(2026, 9, 13, 18, 5),
  },
  {
    id: "3",
    title: "Team meeting notes",
    category: "Work",
    createdAt: new Date(2026, 9, 15, 8, 0),
  },
  {
    id: "4",
    title: "Book ideas",
    category: "Personal",
    createdAt: new Date(2026, 9, 14, 9, 30),
  },
];

const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const formatDate = (d: Date) => {
  const h = d.getHours();
  const m = d.getMinutes().toString().padStart(2, "0");
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${h % 12 || 12}:${m} ${h >= 12 ? "PM" : "AM"}`;
};

export default function Search() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  const term = query.trim().toLowerCase();

  // newest first, matching on the title only
  const results = term
    ? SAMPLE_NOTES.filter((n) => n.title.toLowerCase().includes(term)).sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
      )
    : [];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FFFFFF", "#EAF8FC", "#83CDE2"]}
        style={styles.background}
      />

      <StatusBar hidden />

      {/* top header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setMenuOpen(true)}>
          <Ionicons name="menu" size={36} color="#000" />
        </TouchableOpacity>
        <Text style={styles.logo}>
          DIGI<Text style={styles.blue}>DIARY</Text>
        </Text>
      </View>

      {/* back arrow and search bar */}
      <View style={styles.searchRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={32} color="#777" />
        </TouchableOpacity>

        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Your Notes"
            placeholderTextColor="#6B7A82"
            value={query}
            onChangeText={setQuery}
            autoFocus
            returnKeyType="search"
          />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        {term !== "" && results.length === 0 && (
          <Text style={styles.emptyText}>No notes found</Text>
        )}

        {results.map((note) => (
          <TouchableOpacity key={note.id} style={styles.card}>
            <Text style={styles.cardTitle}>{note.title}</Text>
            <Text style={styles.cardMeta}>
              {formatDate(note.createdAt)} · {note.category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Sidebar visible={menuOpen} onClose={() => setMenuOpen(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
    marginTop: 50,
  },
  logo: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 10,
  },
  blue: {
    color: "#7CC9E0",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 12,
  },
  searchBox: {
    flex: 1,
    height: 40,
    marginLeft: 6,
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 20,
    backgroundColor: "#DDE6EA",
    paddingHorizontal: 18,
    justifyContent: "center",
    elevation: 4,
  },
  searchInput: {
    fontSize: 14,
    color: "#2B3A42",
  },
  scroll: {
    padding: 16,
    paddingBottom: 60,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#4F5B62",
  },
  card: {
    backgroundColor: "#A5D8EA",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#6C77F0",
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginBottom: 14,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2B3A42",
  },
  cardMeta: {
    marginTop: 6,
    fontSize: 12,
    color: "#4A6572",
  },
});
