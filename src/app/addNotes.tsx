import { StyleSheet, View } from 'react-native';

export default function addNotes(){
    return(
        <View>
            <View>createdAt: new Date(),</View>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex: 1,
    },
})