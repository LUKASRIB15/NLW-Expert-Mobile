import { Feather } from "@expo/vector-icons";
import { ReactNode, useRef } from "react";
import { Animated, PanResponder, Text, View } from "react-native";
import colors from "tailwindcss/colors";

interface DimissibleProps{
  children: ReactNode
  onDimiss: ()=>void
}

export function Dimissible({children, onDimiss}: DimissibleProps){
  const pan = useRef(new Animated.ValueXY()).current

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: ()=> true,
      onPanResponderMove: Animated.event([
        null,
        {dx: pan.x, dy: pan.y}
      ], {useNativeDriver: false}),
      onPanResponderRelease: (_, gesture)=>{
        if(gesture.dx>100){
          Animated.timing(pan, {
            toValue: {x:500, y:0},
            duration: 200,
            useNativeDriver: false
          }).start(()=>{
            onDimiss()
          })
        }else{
          Animated.spring(pan, {
            toValue: {x:0, y:0},
            useNativeDriver: false
          }).start()
        }
      }
    })
  ).current

  return (
    <View className="bg-red-500 rounded-md mb-4">
      <View className="absolute bottom-0 pl-4 pb-2">
        <Feather name="trash" color={colors.white} size={20}/>
        <Text className="font-subtitle text-white">Deslize {'\n'}para apagar</Text>
      </View>
      <Animated.View
      className="bg-slate-900 px-2"
      style={{
        transform: [{translateX: pan.x}]
      }}
      {...panResponder.panHandlers}
    >
    {children}
  </Animated.View>
    </View>
  )
}