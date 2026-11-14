import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StatusBar, StyleSheet, Text, View, } from 'react-native';

export default function addNotes(){
    return(
        <View>
            <View></View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF8FC',
  },

  gradient: {
    flex: 1,
  },

  header: {
    marginTop: 35,
    marginHorizontal: 27,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  logo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    letterSpacing: -1,
  },

  logoBlue: {
    color: '#7CC9E0',
  },

  calendarButton: {
    position: 'relative',
    padding: 3,
  },

  calendarAdd: {
    position: 'absolute',
    right: -2,
    bottom: 0,
    backgroundColor: '#85CEE4',
    borderRadius: 10,
  },

  actions: {
    marginTop: 12,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 32,
  },

  undoRedo: {
    flexDirection: 'row',
    alignItems: 'center',
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
    borderColor: '#D0E2E9',
    borderRadius: 10,
    paddingHorizontal: 13,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#263238',
    backgroundColor: 'rgba(255,255,255,0.12)',
  },

  contentInput: {
    flex: 1,
    marginTop: 7,
    paddingHorizontal: 13,
    paddingTop: 10,
    fontSize: 14,
    color: '#263238',
    lineHeight: 23,
  },

  bottomToolbar: {
    height: 51,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E4E4E4',
  },

  toolButton: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textTool: {
    fontSize: 21,
    color: '#000',
  },
});
