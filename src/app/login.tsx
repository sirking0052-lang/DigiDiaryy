
import { useState } from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Missing Information', 'Please enter your email and password.');
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: password,
      });

      if (error) {
        Alert.alert('Login Failed', error.message);
        return;
      }

      router.replace('/allNotes');

    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <LinearGradient
        colors={['#EAF8FC', '#edfbff', '#83CDE2']}
        style={styles.background}
      >
        {/* LOGO */}
        <Text style={styles.logo}>
          DIGI<Text style={styles.blue}>DIARY</Text>
        </Text>

        {/* LOGIN FORM */}
        <View style={styles.form}>
          <Text style={styles.title}>Login</Text>

          {/* SIGN UP */}
          <View style={styles.signupRow}>
            <Text style={styles.signupText}>
              Don't have an account?
            </Text>

            <TouchableOpacity
              onPress={() => router.push('/signup')}
            >
              <Text style={[styles.blue, styles.bold]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          {/* EMAIL */}
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="Email or Phone Number"
              placeholderTextColor="#555"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              editable={!loading}
            />
          </View>

          {/* PASSWORD */}
          <View style={[styles.inputBox, styles.row]}>
            <Image
              source={require('../../assets/appicon/lock.png')}
              style={styles.lockIcon}
            />

            <TextInput
              style={[styles.input, { marginLeft: 8 }]}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              editable={!loading}
            />
          </View>

          {/* FORGOT PASSWORD */}
          <TouchableOpacity
            onPress={() => router.push('/forgotpass')}
            disabled={loading}
          >
            <Text
              style={[
                styles.blue,
                styles.bold,
                styles.forgot,
              ]}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>

          {/* LOGIN BUTTON */}
          <TouchableOpacity
            onPress={handleLogin}
            style={[
              styles.loginButton,
              loading && { opacity: 0.7 },
            ]}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.loginText}>
                Login
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },

  background: {
    flex: 1,
    width: '100%',
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

  bold: {
    fontWeight: 'bold',
  },

  form: {
    width: 270,
    marginTop: 70,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  signupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 20,
  },

  signupText: {
    fontSize: 15,
    marginRight: 14,
  },

  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 25,
    paddingHorizontal: 18,
    marginBottom: 15,
  },

  input: {
    flex: 1,
    fontSize: 14,
  },

  forgot: {
    marginTop: 5,
    marginLeft: 5,
    fontSize: 15,
  },

  loginButton: {
    marginTop: 35,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#08284F',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  lockIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
});
