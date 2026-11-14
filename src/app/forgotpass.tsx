import { useRouter } from 'expo-router';
import { ComponentRef, useRef, useState } from 'react';
import { Image, StatusBar, StyleSheet, Text, TextInput, TextInputKeyPressEvent, TouchableOpacity, View } from 'react-native';
export default function ForgotPass() {
  const router = useRouter();
  const [step, setStep] = useState<'request' | 'verify' | 'reset'>('request');
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const inputs = useRef<(ComponentRef<typeof TextInput> | null)[]>([]);

  const handleCodeChange = (text: string, index: number) => {
    const digit = text.replace(/[^0-9]/g, '').slice(-1);
    const next = [...code];
    next[index] = digit;
    setCode(next);
    if (digit && index < 5) inputs.current[index + 1]?.focus();
  };

 const handleKeyPress = (e: TextInputKeyPressEvent, index: number) => {
  if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
    inputs.current[index - 1]?.focus();
  }
  };

  const handleReset = () => {
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    router.replace('/login');
  };

  return (
    
    <View style={styles.container}>
      <StatusBar hidden />

      <Text style={styles.logo}>
        DIGI<Text style={styles.blue}>DIARY</Text>
      </Text>

      <View style={styles.form}>
        {/* STEP 1: enter email or phone */}
        {step === 'request' && (
          <>
            <Text style={styles.title}>Forgot Password?</Text>
            <Text style={styles.subtitle}>
              Enter your {method === 'email' ? 'email address' : 'phone number'} to reset your password
            </Text>

            <View style={styles.toggleRow}>
              <TouchableOpacity
                style={[styles.toggleButton, method === 'email' && styles.toggleActive]}
                onPress={() => setMethod('email')}
              >
                <Text style={[styles.toggleText, method === 'email' && styles.toggleTextActive]}>Email</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleButton, method === 'phone' && styles.toggleActive]}
                onPress={() => setMethod('phone')}
              >
                <Text style={[styles.toggleText, method === 'phone' && styles.toggleTextActive]}>Phone Number</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder={method === 'email' ? 'Email' : 'Phone Number'}
                placeholderTextColor="#555"
                keyboardType={method === 'email' ? 'email-address' : 'phone-pad'}
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity style={styles.mainButton} onPress={() => setStep('verify')}>
              <Text style={styles.mainButtonText}>Send</Text>
            </TouchableOpacity>
          </>
        )}
        {step === 'verify' && (
          <>
            <Text style={styles.title}>Verify Code</Text>
            <Text style={styles.subtitle}>
              Enter the 6-digit code sent to your {method === 'phone' ? 'phone number' : 'email'}
            </Text>

            <View style={styles.codeRow}>
              {code.map((digit, i) => (
                <TextInput
                  key={i}
                  ref={(ref) => { inputs.current[i] = ref; }}
                  style={[styles.codeBox, digit !== '' && styles.codeBoxFilled]}
                  value={digit}
                  onChangeText={(text) => handleCodeChange(text, i)}
                  onKeyPress={(e) => handleKeyPress(e, i)}
                  keyboardType="number-pad"
                  maxLength={1}
                  textAlign="center"
                />
              ))}
            </View>

            <TouchableOpacity style={styles.mainButton} onPress={() => setStep('reset')}>
              <Text style={styles.mainButtonText}>Verify</Text>
            </TouchableOpacity>

            <View style={styles.resendRow}>
              <Text style={styles.resendText}>Didn't get a code? </Text>
              <TouchableOpacity>
                <Text style={[styles.blue, styles.bold]}>Resend</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        {step === 'reset' && (
          <>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>Create a new password for your account</Text>

            <View style={[styles.inputBox, styles.row]}>
              <Image source={require('../../assets/appicon/lock.png')} style={styles.lockIcon} />
              <TextInput
                style={[styles.input, { marginLeft: 8 }]}
                placeholder="New Password"
                placeholderTextColor="#999"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <View style={[styles.inputBox, styles.row]}>
              <Image source={require('../../assets/appicon/lock.png')} style={styles.lockIcon} />
              <TextInput
                style={[styles.input, { marginLeft: 8 }]}
                placeholder="Confirm Password"
                placeholderTextColor="#999"
                secureTextEntry
                value={confirm}
                onChangeText={setConfirm}
              />
            </View>

            {error !== '' && <Text style={styles.error}>{error}</Text>}

            <TouchableOpacity style={styles.mainButton} onPress={handleReset}>
              <Text style={styles.mainButtonText}>Reset Password</Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/login')}>
          <Text style={[styles.blue, styles.bold]}>Back to Login</Text>
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
  bold: {
    fontWeight: 'bold',
  },
  form: {
    width: 270,
    marginTop: 70,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
    marginBottom: 25,
    textAlign: 'center',
  },
  toggleRow: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 25,
    padding: 3,
  },
  toggleButton: {
    flex: 1,
    height: 36,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleActive: {
    backgroundColor: '#7CC9E0',
  },
  toggleText: {
    fontSize: 14,
    color: '#555',
  },
  toggleTextActive: {
    color: '#08284F',
    fontWeight: 'bold',
  },
  inputBox: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 25,
    paddingHorizontal: 18,
    marginBottom: 15,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 14,
  },
  lockIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  codeBox: {
    width: 38,
    height: 45,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 12,
    fontSize: 18,
    fontWeight: 'bold',
  },
  codeBoxFilled: {
    borderColor: '#7CC9E0',
  },
  error: {
    color: '#D64545',
    fontSize: 12,
    marginBottom: 5,
    textAlign: 'center',
  },
  mainButton: {
    width: '100%',
    marginTop: 10,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#08284F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  resendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  resendText: {
    fontSize: 13,
  },
  backButton: {
    marginTop: 15,
  },
});