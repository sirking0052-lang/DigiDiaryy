import { useRouter } from 'expo-router';
import { Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
export default function CreateAccount() {
    const router = useRouter();
  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <Text style={styles.logo}>
        DIGI<Text style={styles.blue}>DIARY</Text>
      </Text>

      <View style={styles.form}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join us and start your journey</Text>

        <View style={styles.inputBox}>
          <TextInput style={styles.input} placeholder="Name:" placeholderTextColor="#999" />
        </View>

        <View style={styles.inputBox}>
          <TextInput style={styles.input} placeholder="Email/Phone Number:" placeholderTextColor="#999" />
        </View>

        <View style={styles.inputBox}>
          <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#999" secureTextEntry />
        </View>

        <TouchableOpacity style={styles.signUpButton}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.orRow}>
          <View style={styles.line} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../../assets/appicon/facebook.png')} style={styles.socialIcon} />
            <Text style={styles.socialText}>Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../../assets/appicon/google.png')} style={styles.socialIcon} />
            <Text style={styles.socialText}>Google</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.footerLink}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 150,
  },
  blue: {
    color: '#7CC9E0',
  },
  form: {
    width: 270,
    marginTop: 70,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 15,
    marginTop: 2,
    marginBottom: 25,
  },
  inputBox: {
    height: 45,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 25,
    paddingHorizontal: 18,
    marginBottom: 15,
    justifyContent: 'center',
  },
  input: {
    fontSize: 14,
  },
  signUpButton: {
    marginTop: 10,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#08284F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#555',
  },
  orText: {
    marginHorizontal: 12,
    fontSize: 14,
    color: '#555',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 60,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7CC9E0',
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 36,
    marginHorizontal: 12,
  },
  socialIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    marginRight: 6,
  },
  socialText: {
    fontSize: 11,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 75,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A5D8EA',
    borderTopWidth: 1,
    borderColor: '#7CC9E0',
  },
  footerText: {
    fontSize: 15,
  },
  footerLink: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#08284F',
  },
});