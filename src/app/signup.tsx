import { useState } from 'react';
import { useRouter } from 'expo-router';
import {Image,StatusBar,StyleSheet,Text,TextInput,TouchableOpacity,View,Alert,ActivityIndicator,} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../lib/supabase';

export default function CreateAccount() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!name.trim() || !email.trim() || !password) {
      Alert.alert(
        'Missing Information',
        'Please fill in all fields.'
      );
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        'Invalid Password',
        'Password must be at least 6 characters.'
      );
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password: password,
        options: {
          data: {
            full_name: name.trim(),
          },
        },
      });

      if (error) {
        Alert.alert('Sign Up Failed', error.message);
        return;
      }

      if (data.user) {
        Alert.alert(
          'Registration Successful!',
          'Your account has been created successfully!',
          [
            {
              text: 'OK',
              onPress: () => router.replace('/login'),
            },
          ]
        );
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Something went wrong. Please try again.'
      );
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
        <Text style={styles.logo}>
          DIGI<Text style={styles.blue}>DIARY</Text>
        </Text>

        <View style={styles.form}>
          <View style={styles.heading}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Join us and start your journey
            </Text>
          </View>

          {/* NAME */}
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="Name:"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

          {/* EMAIL */}
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="Email:"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* PASSWORD */}
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {/* SIGN UP BUTTON */}
          <TouchableOpacity
            style={[
              styles.signUpButton,
              loading && styles.disabledButton,
            ]}
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.signUpText}>Sign Up</Text>
            )}
          </TouchableOpacity>

          {/* OR */}
          <View style={styles.orRow}>
            <View style={styles.line} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.line} />
          </View>

          {/* SOCIAL BUTTONS */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require('../../assets/appicon/facebook.png')}
                style={styles.socialIcon}
              />
              <Text style={styles.socialText}>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require('../../assets/appicon/google.png')}
                style={styles.socialIcon}
              />
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Already have an account?{' '}
          </Text>

          <TouchableOpacity
            onPress={() => router.push('/login')}
          >
            <Text style={styles.footerLink}>Sign in</Text>
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

  form: {
    width: 270,
    marginTop: 70,
  },

  heading: {
    alignItems: 'center',
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

  disabledButton: {
    opacity: 0.6,
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
