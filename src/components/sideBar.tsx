import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
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

  const slideAnim = useRef(
    new Animated.Value(-SIDEBAR_WIDTH)
  ).current;

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
  }, [visible]);

  const handleNavigate = (screen: string) => {
    onClose();
    onNavigate(screen);
  };

  const confirmLogout = () => {
    setLogoutOpen(false);
    onClose();
    router.replace('/login');
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={() => (logoutOpen ? setLogoutOpen(false) : onClose())}
    >
      <View style={styles.modalContainer}>

        {/* OUTSIDE OVERLAY */}
        <View style={styles.overlay} />

        {/* SIDEBAR PANEL */}
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
            colors={['#FFFFFF', '#80CCE6']}
            style={styles.background}
          >

            <View style={styles.innerContainer}>

              {/* BACK BUTTON */}
              <Pressable
                style={styles.backButton}
                onPress={onClose}
              >
                <Image
                  source={require('../../assets/sidebar/BackSidebar.png')}
                  style={styles.backImage}
                  resizeMode="contain"
                />
              </Pressable>

              {/* PROFILE */}
              <View style={styles.profileContainer}>

                <Image
                  source={require('../../assets/sidebar/profile.png')}
                  style={styles.profileImage}
                  resizeMode="contain"
                />

                <View style={styles.textContainer}>
                  <Text style={styles.userName}>
                    User Name
                  </Text>

                  <Text style={styles.userEmail}>
                    User Email
                  </Text>
                </View>

                <View style={styles.line} />

              </View>

              {/* MENU LIST */}
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.menuScroll}
              >

                {/* CATEGORIES */}
                <View style={styles.categoriesContainer}>

                  <Text style={styles.sectionTitle}>
                    CATEGORIES
                  </Text>

                  <View style={styles.categoriesList}>

                    <Pressable
                      style={styles.sidebarButton}
                      onPress={() => router.replace('/allNotes')}
                    >
                      <Text style={styles.sidebarTextButton}>
                        All Notes
                      </Text>
                    </Pressable>

                    <Pressable
                      style={styles.sidebarButton}
                      onPress={() => router.replace('/workNotes')}
                    >
                      <Text style={styles.sidebarTextButton}>
                        Work
                      </Text>
                    </Pressable>

                    <Pressable
                      style={styles.sidebarButton}
                      onPress={() => router.replace('/PersonalNotes')}
                    >
                      <Text style={styles.sidebarTextButton}>
                        Personal
                      </Text>
                    </Pressable>

                    <Pressable
                      style={styles.sidebarButton}
                      onPress={() => router.replace('/SchoolNotes')}
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
                      onPress={() => handleNavigate('bookmark')}
                    >
                      <Text style={styles.sidebarTextButton}>
                        Bookmark
                      </Text>
                    </Pressable>

                    <Pressable
                      style={styles.sidebarButton}
                      onPress={() => handleNavigate('calendar')}
                    >
                      <Text style={styles.sidebarTextButton}>
                        Calendar
                      </Text>
                    </Pressable>

                    <Pressable
                      style={styles.sidebarButton}
                      onPress={() => router.push('/trash')}
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

        {/* LOGOUT CONFIRMATION DIALOG (drawn last so it sits on top of the sidebar) */}
        {logoutOpen && (
          <View style={styles.dialogRoot}>
            <Pressable
              style={styles.dialogBackdrop}
              onPress={() => setLogoutOpen(false)}
            />

            <View style={styles.dialog}>
              <Text style={styles.dialogTitle}>Log out?</Text>
              <Text style={styles.dialogMessage}>
                Are you sure you want to log out?
              </Text>

              <View style={styles.dialogActions}>
                <Pressable onPress={confirmLogout}>
                  <Text style={styles.dialogButton}>Yes</Text>
                </Pressable>

                <Pressable onPress={() => setLogoutOpen(false)}>
                  <Text style={styles.dialogButton}>No</Text>
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
    flexDirection: 'row',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  sidebarWrapper: {
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    overflow: 'hidden',
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
    justifyContent: 'center',
  },

  backImage: {
    width: 25,
    height: 25,
  },

  // PROFILE
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  profileImage: {
    width: 115,
    height: 115,
  },

  textContainer: {
    marginTop: 15,
    alignItems: 'center',
  },

  userName: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#000000',
  },

  userEmail: {
    fontSize: 13,
    color: '#555555',
    marginTop: 4,
  },

  line: {
    backgroundColor: '#CCCBCB',
    height: 2,
    width: '100%',
    marginTop: 20,
  },

  // CATEGORIES
  menuScroll: {
    flex: 1,
  },

  categoriesContainer: {
    paddingTop: 22,
  },

  sectionTitle: {
    color: '#777777',
    fontSize: 17,
    fontWeight: '600',
  },

  categoriesList: {
    marginVertical: 10,
  },

  sidebarButton: {
    height: 42,
    marginTop: 3,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },

  sidebarTextButton: {
    fontSize: 17,
    color: '#000000',
  },

  // LOGOUT
  logoutButtonContainer: {
    alignItems: 'center',
    paddingTop: 12,
  },

  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  logoutText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#000000',
  },

  // LOGOUT DIALOG
  dialogRoot: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dialogBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  dialog: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 20,
    elevation: 20,
  },

  dialogTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },

  dialogMessage: {
    marginTop: 16,
    fontSize: 16,
    color: '#7A7A7A',
  },

  dialogActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 28,
    marginTop: 50,
  },

  dialogButton: {
    fontSize: 18,
    color: '#7CC9E0',
  },

});