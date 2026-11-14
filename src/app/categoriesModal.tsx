import React, { useState } from 'react';
import {View,Text,TextInput,StyleSheet,StatusBar,Pressable,ScrollView,} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function categoriesModal(){
    return(
        <View style={styles.container}>

            
            <View>
                <View style={styles.modalContainer}>
                    <Pressable>
                        <Text>All Notes</Text>
                    </Pressable>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    gradient: {
    flex: 1,
  },
  modalContainer:{
    backgroundColor: 'red',
    width: 100,
    height: 200,
  },
})