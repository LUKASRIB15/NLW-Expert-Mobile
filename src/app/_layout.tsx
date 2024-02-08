import {Slot, Stack} from "expo-router"
import { SafeAreaView } from "react-native"
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts
} from "@expo-google-fonts/inter"
import { Loading } from "@/components/loading"
import colors from "tailwindcss/colors"

export default function Layout(){
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold
  })

  if(!fontsLoaded){
    return <Loading/>
  }

  return (
    <SafeAreaView className= "flex-1">
      <Stack screenOptions={{
        headerShown: false,
        animation: "ios",
        contentStyle: {backgroundColor: colors.slate[900]}
      }}>
        <Stack.Screen name="index"/>
        <Stack.Screen name="products/[id]"/>
      </Stack>
    </SafeAreaView>
  )
}