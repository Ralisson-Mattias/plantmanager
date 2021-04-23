import {
  Jost_400Regular,
  Jost_600SemiBold, useFonts
} from '@expo-google-fonts/jost'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AppLoading from 'expo-app-loading'
import React, { useEffect } from 'react'
import Routes from './src/routes'


export default function App() {


  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  })

  // useEffect(() => {
  //   async function clear() {
  //     await AsyncStorage.clear()
  //   }
  //   clear()
  // }, [])

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <Routes />
  )
}
