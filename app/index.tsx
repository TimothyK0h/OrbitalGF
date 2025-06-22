// app/index.tsx
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

export default function RedirectToLoading() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/loading');
  }, []);

  return <View style={{ flex: 1, backgroundColor: '#fff' }} />;
}
