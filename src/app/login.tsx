import { StyleSheet, Text, View } from 'react-native';

export default function Login(){
  return(
    
    <View style={styles.container}>
        <Text style ={{fontSize: 40, fontWeight: 'bold', marginTop: 150}}> DIGI
          <Text style={{color: '#7CC9E0'}}>DIARY</Text>
        </Text>
        <Text style= {{fontWeight: 'bold', fontSize: 30, marginTop: 80, right: 90}}> Login</Text>
        <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style= {{fontSize: 17, fontWeight: 'bold', right: 30}}>Don't have a account?</Text>
            <Text style= {{color: '#7CC9E0', fontWeight:'bold', fontSize: 17,}}>Sign up</Text>
        </View>
        <View style = {styles.loginbox}>
          <Text> Email or phone number</Text>
        </View>
        <View style ={styles.passwordbox}>
          <Text>Password</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
      
      position: 'absolute',
      flex: 1,
      alignSelf: 'center',
      alignItems: 'center',

    },
    loginbox:{
      alignSelf: 'center',
      justifyContent: 'center',
      right:20,
      width: 250,
      top: 20,
     height: 45,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 20,
    padding: 10,
    },
  passwordbox:{
      marginTop: 15,
      gap: 20,
      alignSelf: 'center',
      justifyContent: 'center',
      right:20,
      width: 250,
      top: 20,
     height: 45,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 20,
    padding: 10,
  },
})