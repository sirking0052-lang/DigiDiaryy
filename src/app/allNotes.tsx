import BottomNavbar from "@/components/bottomNavbarNotes";
import Sidebar from "@/components/sideBar";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native";

export default function AllNotes() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleNavigation = (screen: string) => {
    console.log("Navigate to:", screen);
    setSidebarVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <LinearGradient
        colors={["#EAF8FC", "#9DD9EA", "#83CDE2"]}
        style={styles.background}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.titleRow}>
            {/* MENU BUTTON */}
            <Pressable
              onPress={() => setSidebarVisible(true)}
              style={styles.menuButton}
            >
              <Ionicons name="menu" size={27} color="#000000" />
            </Pressable>

            {/* APP TITLE */}
            <Text style={styles.title}>
              DIGI<Text style={styles.titleBlue}>DIARY</Text>
            </Text>
          </View>

          {/* CATEGORY AND SEARCH */}
          <View style={styles.categoryRow}>
            <Pressable
              style={styles.categoryButton}
              onPress={() => console.log("All Notes category")}
            >
              <Text style={styles.categoryText}>All Notes</Text>
            </Pressable>

            {/* SEARCH */}
            <Pressable onPress={() => handleNavigation("search")}>
              <Ionicons name="search-outline" size={32} color="#000000" />
            </Pressable>
          </View>
        </View>

        {/* DIVIDER */}
        <View style={styles.divider} />

        {/* MAIN CONTENT */}
        <View style={styles.content}>
          <View style={styles.welcomeCard}>
            <Text style={styles.welcomeText}>WELCOME TO DIGI:DIARY</Text>
          </View>
        </View>

        {/* BOTTOM NAVBAR */}
        <BottomNavbar activeTab="work" onNavigate={handleNavigation} />
      </LinearGradient>

      {/* SIDEBAR */}
      <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        onNavigate={handleNavigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9DD9EA",
  },

  background: {
    flex: 1,
  },

  // HEADER
  header: {
    paddingHorizontal: 18,
    paddingTop: 45,
    paddingBottom: 8,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuButton: {
    marginRight: 9,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    letterSpacing: -0.8,
  },

  titleBlue: {
    color: "#80CBE2",
  },

  // CATEGORY
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
    paddingHorizontal: 10,
  },

  categoryButton: {
    width: 66,
    height: 27,
    backgroundColor: "#83CDE2",
    borderWidth: 1.5,
    borderColor: "#416D7C",
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },

  categoryText: {
    fontSize: 12,
    color: "#000000",
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.22)",
  },

  // CONTENT
  content: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 16,
  },

  welcomeCard: {
    width: "100%",
    height: 175,
    backgroundColor: "#9DD8EA",
    borderRadius: 52,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },

  welcomeText: {
    fontSize: 18,
    fontWeight: "900",
    fontStyle: "italic",
    color: "#102A40",
    textAlign: "center",
  },
});
