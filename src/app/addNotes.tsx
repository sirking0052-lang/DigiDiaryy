import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import {
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";

export default function AddNotes() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <LinearGradient
        colors={["#F1FAFD", "#C5EAF5", "#85CEE4"]}
        locations={[0, 0.55, 1]}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>
            DIGI<Text style={styles.logoBlue}>DIARY</Text>
          </Text>

          <Pressable style={styles.calendarButton}>
            <Ionicons name="calendar-outline" size={27} color="#000" />
            <Ionicons
              name="add-circle"
              size={14}
              color="#000"
              style={styles.calendarAdd}
            />
          </Pressable>
        </View>

        {/* Editor Actions */}
        <View style={styles.actions}>
          <Pressable onPress={() => router.back()} hitSlop={10}>
            <Ionicons name="chevron-back" size={32} color="#000" />
          </Pressable>

          <View style={styles.undoRedo}>
            <Pressable style={styles.actionButton}>
              <Ionicons name="arrow-undo-outline" size={27} color="#000" />
            </Pressable>

            <Pressable style={styles.actionButton}>
              <Ionicons name="arrow-redo-outline" size={27} color="#777" />
            </Pressable>
          </View>

          <Pressable onPress={() => router.push("/categoriesModal")}>
            <Ionicons name="ellipsis-vertical" size={22} color="#777" />
          </Pressable>
        </View>

        {/* Note Editor */}
        <View style={styles.editor}>
          <TextInput
            style={styles.titleInput}
            placeholder="Title"
            placeholderTextColor="#707D81"
            value={title}
            onChangeText={setTitle}
            multiline={false}
          />

          <TextInput
            style={styles.contentInput}
            placeholder="Write here"
            placeholderTextColor="#718087"
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Bottom Toolbar */}
        <View style={styles.bottomToolbar}>
          <Pressable style={styles.toolButton}>
            <Text style={styles.textTool}>Aa</Text>
          </Pressable>

          <Pressable style={styles.toolButton}>
            <Ionicons name="list-outline" size={31} color="#000" />
          </Pressable>

          <Pressable style={styles.toolButton}>
            <Ionicons name="image-outline" size={29} color="#000" />
          </Pressable>

          <Pressable style={styles.toolButton}>
            <Ionicons name="color-palette" size={30} color="#000" />
          </Pressable>

          <Pressable style={styles.toolButton}>
            <Ionicons name="checkmark" size={38} color="#000" />
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF8FC",
  },

  gradient: {
    flex: 1,
  },

  header: {
    marginTop: 35,
    marginHorizontal: 27,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#000",
    letterSpacing: -1,
  },

  logoBlue: {
    color: "#7CC9E0",
  },

  calendarButton: {
    position: "relative",
    padding: 3,
  },

  calendarAdd: {
    position: "absolute",
    right: -2,
    bottom: 0,
    backgroundColor: "#85CEE4",
    borderRadius: 10,
  },

  actions: {
    marginTop: 12,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 32,
  },

  undoRedo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  actionButton: {
    paddingHorizontal: 2,
  },

  editor: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 17,
  },

  titleInput: {
    height: 47,
    borderWidth: 1,
    borderColor: "#D0E2E9",
    borderRadius: 10,
    paddingHorizontal: 13,
    fontSize: 25,
    fontWeight: "bold",
    color: "#263238",
    backgroundColor: "rgba(255,255,255,0.12)",
  },

  contentInput: {
    flex: 1,
    marginTop: 7,
    paddingHorizontal: 13,
    paddingTop: 10,
    fontSize: 14,
    color: "#263238",
    lineHeight: 23,
  },

  bottomToolbar: {
    height: 51,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E4E4E4",
  },

  toolButton: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  textTool: {
    fontSize: 21,
    color: "#000",
  },
});
