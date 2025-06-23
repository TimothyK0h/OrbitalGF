import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState<FirebaseAuthTypes.User | null >();
  const router = useRouter();
  const segments = useSegments();

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null ) => {
    console.log('onAuthStateChanged', user);
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect ( () => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [])

  useEffect(() => {
    if (initializing) return;

    const inAuthGroup = segments[0] === '(auth)';
    const currentRoute = segments.join('/');
    console.log('Current Route:', currentRoute)
    const onboardingRoutes = ['loading', 'intro', 'intro2', '', 'signup', 'home'];

    if (user && !inAuthGroup) {
      console.log('➡️ redirecting to /home')
      router.replace('/(auth)/(nav)/home');
    } else if (!user && !inAuthGroup && !onboardingRoutes.includes(currentRoute)) {
      console.log('➡️ redirecting to /')
      router.replace('/');
    }
  }, [user, initializing, segments]);

  if (initializing)
    return (
    <View
      style={{
        alignItems:'center',
        justifyContent:'center',
        flex: 1,
      }} >
      <ActivityIndicator size= "large"/>
    </View>
  )

  return (
  <Stack> 
    <Stack.Screen name="index" options = {{headerShown: false}}/>
    <Stack.Screen name='loading' options = {{headerShown: false}}/>
    <Stack.Screen name='intro' options = {{headerShown: false}}/>
    <Stack.Screen name='intro2' options = {{headerShown: false}}/>
    <Stack.Screen name="(auth)" options = {{headerShown: false}} />
  </Stack>
  );
}