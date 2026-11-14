import React, { useEffect, useRef } from 'react';
import {View,Text,StyleSheet,Pressable,Image,Modal,Animated,Dimensions,ScrollView,} from 'react-native';
import {router} from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
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
    }
  }, [visible]);

  const handleNavigate = (screen: string) => {
    onClose();
    onNavigate(screen);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
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
                      onPress={() => handleNavigate('trash')}
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
                  onPress={() => handleNavigate('logout')}
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
    backgroundColor: '#CCCB​CB',
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

});
