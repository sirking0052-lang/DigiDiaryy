import { StyleSheet, Text, View } from 'react-native';

export default function Login(){
  return(
    <View style={styles.container}>
      <Text style={styles.digitext}> DIGI </Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        color: 'white',
    },
    digitext:{
       color: '#7CC9E0',
    }
})