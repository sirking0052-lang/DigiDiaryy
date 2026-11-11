import React, { useEffect, useRef, useState } from 'react';
import {View,Text,StyleSheet,Pressable,Animated,StatusBar,} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Index() {
  const [screen, setScreen] = useState(0);

  const progress = useRef(new Animated.Value(0)).current;
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let timers: ReturnType<typeof setTimeout>[] = [];

    const showScreen = (nextScreen: number) => {
      setScreen(nextScreen);
      fade.setValue(0);

      Animated.timing(fade, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }).start();
    };

    // FRAME 1
    timers.push(setTimeout(() => {
      showScreen(1);
    }, 700));

    // FRAME 2
    timers.push(setTimeout(() => {
      showScreen(2);
    }, 1600));

    // FRAME 3
    timers.push(setTimeout(() => {
      showScreen(3);
    }, 2500));

    // FRAME 8 - LOADING BAR
    timers.push(setTimeout(() => {
      showScreen(4);

      progress.setValue(0);

      Animated.timing(progress, {
        toValue: 1,
        duration: 1800,
        useNativeDriver: false,
      }).start();
    }, 3400));

    // FINAL SCREEN - GET STARTED
    timers.push(setTimeout(() => {
      showScreen(5);
    }, 5200));

    return () => {
      timers.forEach(clearTimeout);
      progress.stopAnimation();
      fade.stopAnimation();
    };
  }, []);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={screen === 5 ? 'dark-content' : 'light-content'}
      />

      {screen !== 5 ? (
        <LinearGradient
          colors={['#DDF4FA', '#7CC9E0']}
          style={styles.background}
        >
          <Animated.View
            style={[
              styles.center,
              { opacity: fade },
            ]}
          >
            {/* FRAME 1 */}
            {screen === 0 && null}

            {/* FRAME 2 */}
            {screen === 1 && (
              <Text style={styles.logo}>
                DIGI<Text style={styles.dark}>DIARY</Text>
              </Text>
            )}

            {/* FRAME 3 */}
            {screen === 2 && (
              <>
                <View style={styles.book}>
                  <View style={styles.pageLeft} />
                  <View style={styles.pageRight} />
                  <View style={styles.spine} />
                </View>

                <Text style={styles.logo}>
                  DIGI<Text style={styles.dark}>DIARY</Text>
                </Text>
              </>
            )}

            {/* FRAME 8 */}
            {screen === 3 && (
              <Text style={styles.logo}>
                DIGI<Text style={styles.dark}>DIARY</Text>
              </Text>
            )}
          </Animated.View>

          {/* PROGRESS BAR */}
          {screen === 4 && (
            <>
              <Animated.View
                style={[
                  styles.center,
                  { opacity: fade },
                ]}
              >
                <Text style={styles.logo}>
                  DIGI<Text style={styles.dark}>DIARY</Text>
                </Text>
              </Animated.View>

              <View style={styles.progressContainer}>
                <View style={styles.progressTrack}>
                  <Animated.View
                    style={[
                      styles.progressFill,
                      { width: progressWidth },
                    ]}
                  />
                </View>
              </View>
            </>
          )}
        </LinearGradient>
      ) : (
        /* GET STARTED SCREEN */
        <View style={styles.welcome}>
          <Animated.View
            style={[
              styles.center,
              { opacity: fade },
            ]}
          >
            <Text style={styles.finalLogo}>
              DIGI<Text style={styles.blue}>DIARY</Text>
            </Text>
          </Animated.View>

          <Pressable
            style={styles.button}
            onPress={() => {
              console.log('Navigate to onboarding');
            }}
          >
            <Text style={styles.buttonText}>
              Get Started
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },

  dark: {
    color: '#092B54',
  },

  book: {
    width: 76,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  pageLeft: {
    width: 32,
    height: 52,
    borderWidth: 4,
    borderColor: '#092B54',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 3,
    transform: [{ skewY: '8deg' }],
  },

  pageRight: {
    width: 32,
    height: 52,
    borderWidth: 4,
    borderColor: '#092B54',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 3,
    transform: [{ skewY: '-8deg' }],
  },

  spine: {
    position: 'absolute',
    width: 3,
    height: 50,
    backgroundColor: '#092B54',
  },

  progressContainer: {
    position: 'absolute',
    bottom: 45,
    width: '48%',
  },

  progressTrack: {
    width: '100%',
    height: 5,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 10,
    overflow: 'hidden',
  },

  progressFill: {
    height: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },

  welcome: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  finalLogo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: -0.5,
  },

  blue: {
    color: '#7CC9E0',
  },

  button: {
    position: 'absolute',
    bottom: 60,
    width: 105,
    height: 34,
    borderRadius: 30,
    backgroundColor: '#7CC9E0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#092B54',
  },
});
