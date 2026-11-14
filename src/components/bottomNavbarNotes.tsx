import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  activeTab?: string;
  onNavigate?: (screen: string) => void;
  onSelectCategory?: (category: string) => void;
};

const OPTIONS = ['All Notes', 'Work', 'Personal', 'School'];

export default function BottomNavbar({
  activeTab = 'home',
  onNavigate = () => {},
  onSelectCategory = () => {},
}: Props) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Notes');

  const handleSelect = (category: string) => {
  setSelectedCategory(category);
  onSelectCategory(category);
  setSheetOpen(false);

  if (category === 'All Notes') {
    router.navigate('/allNotes');
  } 
  else if (category === 'Personal') {
    router.navigate('/PersonalNotes');
  }
  else if (category === 'School') {
    router.navigate('/SchoolNotes');
  }
  else if (category === 'Work') {
    router.navigate('/workNotes');
  }
};

  return (
    <View style={styles.wrapper}>

      {/* NAVIGATION BAR */}
      <View style={styles.navbar}>

        {/* MORE */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setSheetOpen(true)}
        >
          <Ionicons
            name="ellipsis-vertical"
            size={34}
            color="#000000"
          />
        </TouchableOpacity>

        {/* CALENDAR */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => onNavigate('calendar')}
        >
          <Ionicons
            name="calendar-outline"
            size={34}
            color="#000000"
          />
        </TouchableOpacity>

        {/* CENTER SPACE */}
        <View style={styles.centerSpace} />

        {/* TIMELINE */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/timeline')}
        >
          <Image source={require('../../assets/appicon/timeline.png')} />
        </TouchableOpacity>

        {/* BUDGET */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => onNavigate('budget')}
        >
          <Image source={require('../../assets/appicon/summary.png')} />
        </TouchableOpacity>

      </View>

      {/* FLOATING ADD BUTTON */}
      <Pressable
        style={styles.addButton}
        onPress={() => router.push('/addNotes')}
      >
        <Ionicons
          name="add"
          size={72}
          color="#FFFFFF"
        />
      </Pressable>

      {/* CATEGORY BOTTOM SHEET */}
      <Modal
        visible={sheetOpen}
        transparent
        animationType="slide"
        statusBarTranslucent
        onRequestClose={() => setSheetOpen(false)}
      >
        <View style={styles.modalRoot}>
          {/* dimmed backdrop: tap to close */}
          <Pressable style={styles.backdrop} onPress={() => setSheetOpen(false)} />

          <View style={styles.sheet}>
            {OPTIONS.map((option) => {
              const active = option === selectedCategory;
              return (
                <TouchableOpacity
                  key={option}
                  style={[styles.option, active && styles.optionActive]}
                  onPress={() => handleSelect(option)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </Modal>

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

  modalRoot: {
    flex: 1,
    justifyContent: 'flex-end',
  },
    backdrop: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.55)',
},

  sheet: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    paddingBottom: 24,
    gap: 8,
  },

  option: {
    height: 68,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  optionActive: {
    backgroundColor: '#7CC9E0',
    borderColor: '#7CC9E0',
  },

  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },

});