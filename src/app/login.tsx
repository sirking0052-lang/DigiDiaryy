import { StyleSheet, Text, View } from 'react-native';

export default function Login(){
  return(
    
    <View>
      <Text> DIGI </Text> <Text  style={styles.digitext}> DIARY</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    digitext:{
       color: '#7CC9E0',
       alignSelf: 'center',
    }
})