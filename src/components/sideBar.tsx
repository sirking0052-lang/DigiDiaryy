
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { supabase } from "@/lib/supabase";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SIDEBAR_WIDTH = Math.min(SCREEN_WIDTH * 0.82, 320);

type SidebarProps = {
  visible: boolean;
  onClose: () => void;
  onNavigate?: (screen: string) => void;
};

export default function Sidebar({
  visible,
  onClose,
  onNavigate = () => {},
}: SidebarProps) {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  // USER ACCOUNT DETAILS
  const [userName, setUserName] = useState("Loading...");
  const [userEmail, setUserEmail] = useState("Loading...");

  const slideAnim = useRef(
    new Animated.Value(-SIDEBAR_WIDTH)
  ).current;

  // GET CURRENT LOGGED-IN USER
  useEffect(() => {
    let mounted = true;

    const updateUserDetails = (user: any) => {
      if (!mounted) return;

      if (!user) {
        setUserName("User Name");
        setUserEmail("User Email");
        return;
      }

      const metadata = user.user_metadata ?? {};

      const accountName =
        metadata.full_name ||
        metadata.name ||
        metadata.display_name ||
        metadata.username;

      const fallbackName = user.email
        ? user.email.split("@")[0]
        : "User";

      setUserName(
        typeof accountName === "string" && accountName.trim()
          ? accountName
          : fallbackName
      );

      setUserEmail(user.email || "No email available");
    };

    // GET EXISTING SESSION
    const loadUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
          console.error("Unable to get user:", error.message);
          return;
        }

        updateUserDetails(data.user);
      } catch (error) {
        console.error("Get user error:", error);
      }
    };

    loadUser();

    // LISTEN FOR LOGIN AND LOGOUT
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      updateUserDetails(session?.user ?? null);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // SIDEBAR ANIMATION
  useEffect(() => {
    if (visible) {
      slideAnim.setValue(-SIDEBAR_WIDTH);

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      slideAnim.setValue(-SIDEBAR_WIDTH);
      setLogoutOpen(false);
    }
  }, [visible, slideAnim]);

  // CLOSE SIDEBAR
  const closeSidebar = () => {
    setLogoutOpen(false);
    onClose();
  };

  // NAVIGATION
  const navigateTo = (path: string) => {
    closeSidebar();
    router.replace(path as any);
  };

  // BOOKMARK
  const openBookmark = () => {
    closeSidebar();
    onNavigate("bookmark");

    Alert.alert(
      "Bookmark",
      "The Bookmark screen is not yet available."
    );
  };

  // LOGOUT
  const confirmLogout = async () => {
    if (logoutLoading) return;

    try {
      setLogoutLoading(true);

      const { error } = await supabase.auth.signOut({
        scope: "local",
      });

      if (error) {
        Alert.alert("Logout Failed", error.message);
        return;
      }

      setLogoutOpen(false);
      onClose();

      router.replace("/login" as any);
    } catch (error) {
      console.error("Logout error:", error);

      Alert.alert(
        "Logout Failed",
        "Something went wrong. Please try again."
      );
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={() => {
        if (logoutOpen) {
          setLogoutOpen(false);
        } else {
          closeSidebar();
        }
      }}
    >
      <View style={styles.modalContainer}>
        {/* OUTSIDE OVERLAY */}
        <Pressable
          style={styles.overlay}
          onPress={closeSidebar}
        />

        {/* SIDEBAR */}
        <Animated.View
          style={[
            styles.sidebarWrapper,
            {
              width: SIDEBAR_WIDTH,
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          <LinearGradient
            colors={["#FFFFFF", "#80CCE6"]}
            style={styles.background}
          >
            <View style={styles.innerContainer}>
              {/* BACK BUTTON */}
              <Pressable
                style={styles.backButton}
                onPress={closeSidebar}
                hitSlop={10}
              >
                <Image
                  source={require("../../assets/sidebar/BackSidebar.png")}
                  style={styles.backImage}
                  resizeMode="contain"
                />
              </Pressable>

              {/* PROFILE */}
              <View style={styles.profileContainer}>
                <Image
                  source={require("../../assets/sidebar/profile.png")}
                  style={styles.profileImage}
                  resizeMode="contain"
                />

                <View style={styles.textContainer}>
                  <Text
                    style={styles.userName}
                    numberOfLines={1}
                  >
                    {userName}
                  </Text>

                  <Text
                    style={styles.userEmail}
                    numberOfLines={1}
                  >
                    {userEmail}
                  </Text>
                </View>

                <View style={styles.line} />
              </View>

              {/* MENU */}
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.menuScroll}
                contentContainerStyle={styles.menuContent}
              >
                <View style={styles.categoriesContainer}>
                  {/* CATEGORIES */}
                  <Text style={styles.sectionTitle}>
                    CATEGORIES
                  </Text>

                  <View style={styles.categoriesList}>
                    <Pressable
                      style={styles.sidebarButton}
                      onPress={() => navigateTo("/allNotes")}
                    >
                      <Text style={styles.sidebarTextButton}>
                        All Notes
                      </Text>
                    </Pressable>

                    <Pressable
                      style={styles.sidebarButton}
                      onPress={() => navigateTo("/workNotes")}
                    >
                      <Text style={styles.sidebarTextButton}>
                        Work
                      </Text>
                    </Pressable>

                    <Pressable
                      style={styles.sidebarButton}
                      onPress={() => navigateTo("/PersonalNotes")}
                    >
                      <Text style={styles.sidebarTextButton}>
                        Personal
                      </Text>
                    </Pressable>

                    <Pressable
                      style={styles.sidebarButton}
                      onPress={() => navigateTo("/SchoolNotes")}
                    >
                      <Text style={styles.sidebarTextButton}>
                        School
                      </Text>
                    </Pressable>
                  </View>

                  {/* OTHERS */}
                  <Text style={styles.sectionTitle}>
                    OTHER'S
                  </Text>

                  <View style={styles.categoriesList}>
                    <Pressable
                      style={styles.sidebarButton}
                      onPress={openBookmark}
                    >
                      <Text style={styles.sidebarTextButton}>
                        Bookmark
                      </Text>
                    </Pressable>

                    <Pressable
                      style={styles.sidebarButton}
                      onPress={() => navigateTo("/calendar")}
                    >
                      <Text style={styles.sidebarTextButton}>
                        Calendar
                      </Text>
                    </Pressable>

                    <Pressable
                      style={styles.sidebarButton}
                      onPress={() => navigateTo("/trash")}
                    >
                      <Text style={styles.sidebarTextButton}>
                        Trash
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </ScrollView>

              {/* LOGOUT */}
              <View style={styles.logoutButtonContainer}>
                <Pressable
                  style={styles.logoutButton}
                  onPress={() => setLogoutOpen(true)}
                  disabled={logoutLoading}
                >
                  <Ionicons
                    name="log-out-outline"
                    size={24}
                    color="#000000"
                  />

                  <Text style={styles.logoutText}>
                    LOG OUT
                  </Text>
                </Pressable>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* LOGOUT CONFIRMATION */}
        {logoutOpen && (
          <View style={styles.dialogRoot}>
            <Pressable
              style={styles.dialogBackdrop}
              onPress={() => {
                if (!logoutLoading) {
                  setLogoutOpen(false);
                }
              }}
            />

            <View style={styles.dialog}>
              <Text style={styles.dialogTitle}>
                Log out?
              </Text>

              <Text style={styles.dialogMessage}>
                Are you sure you want to log out?
              </Text>

              <View style={styles.dialogActions}>
                <Pressable
                  onPress={confirmLogout}
                  disabled={logoutLoading}
                >
                  <Text style={styles.dialogButton}>
                    {logoutLoading ? "Please wait..." : "Yes"}
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => setLogoutOpen(false)}
                  disabled={logoutLoading}
                >
                  <Text style={styles.dialogButton}>
                    No
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: "row",
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  sidebarWrapper: {
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    overflow: "hidden",
    elevation: 15,
  },

  background: {
    flex: 1,
  },

  innerContainer: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 55,
    paddingBottom: 25,
  },

  backButton: {
    width: 35,
    height: 35,
    justifyContent: "center",
  },

  backImage: {
    width: 25,
    height: 25,
  },

  // PROFILE
  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  profileImage: {
    width: 115,
    height: 115,
  },

  textContainer: {
    marginTop: 15,
    alignItems: "center",
    width: "100%",
  },

  userName: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#000000",
    maxWidth: "100%",
  },

  userEmail: {
    fontSize: 13,
    color: "#555555",
    marginTop: 4,
    maxWidth: "100%",
  },

  line: {
    backgroundColor: "#CCCBCB",
    height: 2,
    width: "100%",
    marginTop: 20,
  },

  // CATEGORIES
  menuScroll: {
    flex: 1,
  },

  menuContent: {
    flexGrow: 1,
  },

  categoriesContainer: {
    paddingTop: 22,
  },

  sectionTitle: {
    color: "#777777",
    fontSize: 17,
    fontWeight: "600",
  },

  categoriesList: {
    marginVertical: 10,
  },

  sidebarButton: {
    minHeight: 42,
    marginTop: 3,
    justifyContent: "center",
    paddingHorizontal: 8,
  },

  sidebarTextButton: {
    fontSize: 17,
    color: "#000000",
  },

  // LOGOUT
  logoutButtonContainer: {
    alignItems: "center",
    paddingTop: 12,
  },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: 8,
  },

  logoutText: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#000000",
  },

  // LOGOUT DIALOG
  dialogRoot: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    elevation: 100,
  },

  dialogBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  dialog: {
    width: "85%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 20,
    elevation: 20,
  },

  dialogTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  },

  dialogMessage: {
    marginTop: 16,
    fontSize: 16,
    color: "#7A7A7A",
  },

  dialogActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 28,
    marginTop: 50,
  },

  dialogButton: {
    fontSize: 18,
    color: "#7CC9E0",
  },
});
