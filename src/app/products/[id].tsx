import { Image, Text, View } from "react-native";
import {forwardRef} from "react"
import {Redirect, useLocalSearchParams, useNavigation} from "expo-router"
import { PRODUCTS } from "@/utils/data/products";
import { formatCurrency } from "@/utils/functions/format-currency";
import { Button } from "@/components/button";
import { Feather } from "@expo/vector-icons";
import { LinkButton } from "@/components/link-button";
import { useCartStore } from "@/stores/cart-store";
import {MotiImage} from "moti"

export default function Product(){
  const {id} = useLocalSearchParams()
  const cartStore = useCartStore()
  
  const navigation = useNavigation()

  const product = PRODUCTS.find(item=>item.id === id)

  function handleAddToCart(){
    if(product){
      cartStore.add(product)
      navigation.goBack()
    }
  }

  if(!product){
    return <Redirect href="/"/>
  }

  return (
    <View className="flex-1">
      <MotiImage 
        source={product.cover} 
        className="w-full h-52" 
        resizeMode="cover"
        from={{
          scale: 1.4,
          opacity: 0
        }}
        animate={{
          scale: 1,
          opacity: 1
        }}
        transition={{
          type: "timing",
          duration: 500
        }}
      />

      <View className="p-5 mt-8 flex-1 justify-between">
       <View>
        <Text className="text-white text-xl font-heading">{product.title}</Text>
        <Text className="text-lime-400 text-2xl font-heading my-2">
            {formatCurrency(product.price)}
          </Text>
          <Text className="text-slate-400 font-body text-base leading-6 mb-6">{product.description}</Text>
          {
            product.ingredients.map(ingredient=>{
              return (
                <Text className="text-slate-400 font-body text-base leanding-6" key={ingredient}>{"\u2022"} {ingredient}</Text>
              )
            })
          }
       </View>
        <View className="gap-5 w-full">
          <Button onPress={handleAddToCart}>
            <Button.Icon>
              <Feather name="plus-circle" size={20}/>
            </Button.Icon>
            <Button.Text>Adicionar ao pedido</Button.Text>
          </Button>
          <LinkButton title="Voltar ao cardápio" href="/" />
        </View>
      </View>
    </View>
  )
}