import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ReactNode, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BottomNavbarNotes from '../components/bottomNavbarNotes';
import Sidebar from '../components/sideBar';

type Category = 'Personal' | 'School' | 'Work';
type Note = { id: string; category: Category; text: string; createdAt: Date };

const CATEGORIES: Category[] = ['Personal', 'School', 'Work'];

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const formatDate = (d: Date) => {
  const h = d.getHours();
  const m = d.getMinutes().toString().padStart(2, '0');
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${h % 12 || 12}:${m} ${h >= 12 ? 'PM' : 'AM'}`;
};

function TimelineRow({ isFirst, isLast, children }: { isFirst: boolean; isLast: boolean; children: ReactNode }) {
  return (
    <View style={styles.row}>
      <View style={styles.timelineCol}>
        <View style={[styles.line, { top: isFirst ? '50%' : 0, bottom: isLast ? '50%' : 0 }]} />
        <View style={styles.dot} />
      </View>
      <View style={styles.cardWrap}>{children}</View>
    </View>
  );
}

function CardFooter({ onEdit, onDelete }: { onEdit?: () => void; onDelete?: () => void }) {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.footerButton} onPress={onEdit}>
        <Text style={styles.footerText}>Edit</Text>
      </TouchableOpacity>
      <View style={styles.footerDivider} />
      <TouchableOpacity style={styles.footerButton} onPress={onDelete}>
        <Text style={styles.footerText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function Timeline() {
     const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState<Category | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);

  // newest first. For oldest first, use a.createdAt.getTime() - b.createdAt.getTime()
  const visibleNotes = notes
    .filter((n) => n.category === selected)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const deleteNote = (id: string) => setNotes((prev) => prev.filter((n) => n.id !== id));

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

      {/* title bar */}
      <View style={styles.titleBar}>
        <Text style={styles.titleText}>TIMELINE VIEW</Text>
        <View style={styles.titleIcons}>
          {selected === null && (
            <TouchableOpacity style={{ marginRight: 8 }}>
              <Ionicons name="search" size={26} color="#4A6572" />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => router.push('/allNotes')}>
            <Ionicons name="chevron-back" size={28} color="#777" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* VIEW 1: the three categories (no timeline line) */}
        {selected === null &&
          CATEGORIES.map((cat) => (
            <View key={cat} style={styles.categoryWrap}>
              <View style={styles.card}>
                <TouchableOpacity style={styles.cardBody} onPress={() => setSelected(cat)}>
                  <Text style={styles.categoryTitle}>{cat} Diary</Text>
                </TouchableOpacity>
                <CardFooter />
              </View>
            </View>
          ))}

        {/* VIEW 2: notes of the selected category (connected timeline) */}
        {selected !== null && (
          <>
            <Text style={styles.sectionTitle}>{selected} Diary</Text>

            {visibleNotes.length === 0 && <Text style={styles.empty}>No notes yet.</Text>}

            {visibleNotes.map((note, i) => (
              <TimelineRow key={note.id} isFirst={i === 0} isLast={i === visibleNotes.length - 1}>
                <View style={styles.card}>
                  <View style={styles.noteBody}>
                    <Text style={styles.noteDate}>{formatDate(note.createdAt)}</Text>
                    <Text style={styles.noteText}>{note.text}</Text>
                  </View>
                  <CardFooter onDelete={() => deleteNote(note.id)} />
                </View>
              </TimelineRow>
            ))}
          </>
        )}
      </ScrollView>

      <BottomNavbarNotes />

      {/* drawn last so it sits on top of everything */}
      <Sidebar visible={menuOpen} onClose={() => setMenuOpen(false)} />
    </View>
  );
}

const BLUE = '#4450E8';

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
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2B3A42',
  },
  titleIcons: {
    position: 'absolute',
    right: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  scroll: {
    paddingTop: 20,
    paddingBottom: 140,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 14,
    marginBottom: 10,
  },
  empty: {
    marginLeft: 50,
    color: '#777',
  },
  row: {
    flexDirection: 'row',
  },
  timelineCol: {
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    position: 'absolute',
    width: 4,
    backgroundColor: BLUE,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: BLUE,
  },
  cardWrap: {
    flex: 1,
    paddingRight: 14,
    paddingVertical: 10,
  },
  categoryWrap: {
    marginHorizontal: 14,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#A5D8EA',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#6C77F0',
    overflow: 'hidden',
    elevation: 4,
  },
  cardBody: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4F6B78',
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