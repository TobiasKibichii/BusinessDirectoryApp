import { Stack } from "expo-router";
import {useFonts} from 'expo-font'
import { ActivityIndicator } from "react-native";
import { ClerkProvider } from '@clerk/clerk-expo'


export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'appFont': require('./../assets/fonts/Montserrat-Light.ttf'),
    'appFontBold': require('./../assets/fonts/Montserrat-Bold.ttf'),
    'appFontItalic': require('../assets/fonts/Montserrat-Italic.ttf'),
    'appFontSemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'appFontSemiBoldItalic': require('../assets/fonts/Montserrat-SemiBoldItalic.ttf')
  })

  if(!fontsLoaded) {
    return <ActivityIndicator />
  }

  return (
  <ClerkProvider>
    <Stack />
  </ClerkProvider>
  
);
}
