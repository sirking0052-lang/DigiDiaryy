import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BottomNavbarNotes from '../components/bottomNavbarNotes';
import Sidebar from '../components/sideBar';

type DeletedNote = { id: string; category: string; text: string; createdAt: Date };

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const formatDate = (d: Date) => {
  const h = d.getHours();
  const m = d.getMinutes().toString().padStart(2, '0');
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${h % 12 || 12}:${m} ${h >= 12 ? 'PM' : 'AM'}`;
};

export default function Trash() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [deletedNotes, setDeletedNotes] = useState<DeletedNote[]>([]);

  const deleteForever = (id: string) => setDeletedNotes((prev) => prev.filter((n) => n.id !== id));

  return (
    <View style={styles.container}>
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

      {/* search and back bar */}
      <View style={styles.titleBar}>
        <TouchableOpacity style={{ marginRight: 8 }}>
          <Ionicons name="search" size={26} color="#4A6572" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#777" />
        </TouchableOpacity>
      </View>

      {deletedNotes.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyText}>No Data Yet!</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scroll}>
          {deletedNotes.map((note) => (
            <View key={note.id} style={styles.card}>
              <View style={styles.noteBody}>
                <Text style={styles.noteDate}>
                  {formatDate(note.createdAt)} · {note.category}
                </Text>
                <Text style={styles.noteText}>{note.text}</Text>
              </View>
              <View style={styles.footer}>
                <TouchableOpacity style={styles.footerButton}>
                  <Text style={styles.footerText}>Restore</Text>
                </TouchableOpacity>
                <View style={styles.footerDivider} />
                <TouchableOpacity style={styles.footerButton} onPress={() => deleteForever(note.id)}>
                  <Text style={styles.footerText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}

      <BottomNavbarNotes />

      {/* drawn last so it sits on top of everything */}
      <Sidebar visible={menuOpen} onClose={() => setMenuOpen(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
    marginTop: 50,
  },
  logo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  blue: {
    color: '#7CC9E0',
  },
  titleBar: {
    marginTop: 12,
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#999',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 14,
  },
  emptyWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4F5B62',
  },
  scroll: {
    padding: 14,
    paddingBottom: 140,
  },
  card: {
    backgroundColor: '#A5D8EA',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#6C77F0',
    overflow: 'hidden',
    elevation: 4,
    marginBottom: 20,
  },
  noteBody: {
    minHeight: 100,
    paddingHorizontal: 30,
    paddingTop: 14,
    paddingBottom: 10,
  },
  noteDate: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
  },
  noteText: {
    marginTop: 8,
    fontSize: 14,
    color: '#2B3A42',
  },
  footer: {
    flexDirection: 'row',
    height: 40,
    borderTopWidth: 1,
    borderColor: '#4A6572',
  },
  footerButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerDivider: {
    width: 1,
    backgroundColor: '#4A6572',
  },
  footerText: {
    fontSize: 14,
    color: '#4A6572',
  },
});