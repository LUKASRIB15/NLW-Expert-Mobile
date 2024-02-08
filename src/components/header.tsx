import { View, Image, Text, TouchableOpacity } from "react-native";
import {Feather} from "@expo/vector-icons"
import colors from "tailwindcss/colors";
import { Link } from "expo-router";

interface HeaderProps{
  title: string
  cardQuantity?: number
}
export function Header({title, cardQuantity=0}:HeaderProps){
  return (
    <View className="flex-row items-center border-b border-slate-700 pb-5 mx-5">
      <View className="flex-1">
        <Image source={require("@/assets/logo.png")} className="h-6 w-32"/>
        <Text className="text-white text-xl font-heading mt-2">{title}</Text>
      </View>
      { cardQuantity > 0 &&
          <Link href="/cart" asChild>
              <TouchableOpacity className="relative">
            <View className="bg-lime-300 z-10 -right-3.5 top-2 w-4 h-4 rounded-full items-center justify-center">
              <Text className="text-slate-900 font-bold text-xs">{cardQuantity}</Text>
            </View>
            <Feather name="shopping-bag" color={colors.white} size={24}/>
          </TouchableOpacity>
          </Link>
      }
    </View>
  )
}