import React from 'react';
import {View,StyleSheet,Pressable,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  activeTab?: string;
  onNavigate?: (screen: string) => void;
};

export default function BottomNavbar({
  activeTab = 'home',
  onNavigate = () => {},
}: Props) {
  return (
    <View style={styles.wrapper}>

      {/* NAVIGATION BAR */}
      <View style={styles.navbar}>

        {/* MORE */}
        <Pressable
          style={styles.navItem}
          onPress={() => onNavigate('more')}
        >
          <Ionicons
            name="ellipsis-vertical"
            size={34}
            color="#000000"
          />
        </Pressable>

        {/* CALENDAR */}
        <Pressable
          style={styles.navItem}
          onPress={() => onNavigate('calendar')}
        >
          <Ionicons
            name="calendar-outline"
            size={34}
            color="#000000"
          />
        </Pressable>

        {/* CENTER SPACE */}
        <View style={styles.centerSpace} />

        {/* ANALYTICS */}
        <Pressable
          style={styles.navItem}
          onPress={() => onNavigate('analytics')}
        >
          <Ionicons
            name="stats-chart-outline"
            size={36}
            color="#000000"
          />
        </Pressable>

        {/* BUDGET */}
        <Pressable
          style={styles.navItem}
          onPress={() => onNavigate('budget')}
        >
          <Ionicons
            name="wallet-outline"
            size={35}
            color="#000000"
          />
        </Pressable>

      </View>

      {/* FLOATING ADD BUTTON */}
      <Pressable
        style={styles.addButton}
        onPress={() => onNavigate('add')}
      >
        <Ionicons
          name="add"
          size={72}
          color="#FFFFFF"
        />
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({

  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 88,
    zIndex: 100,
  },

  navbar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    paddingHorizontal: 12,
  },

  navItem: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  centerSpace: {
    flex: 1,
  },

  addButton: {
    position: 'absolute',
    alignSelf: 'center',
    top: -65,
    width: 114,
    height: 114,
    borderRadius: 67,
    backgroundColor: '#4248E9',
    borderWidth: 9,
    borderColor: '#83D0E5',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 101,
    elevation: 10,
  },

});
