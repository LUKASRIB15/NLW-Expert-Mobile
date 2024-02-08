import { Button } from "@/components/button";
import { Header } from "@/components/header";
import { Input } from "@/components/input";
import { LinkButton } from "@/components/link-button";
import { Product } from "@/components/product";
import { ProductCartProps, useCartStore } from "@/stores/cart-store";
import { formatCurrency } from "@/utils/functions/format-currency";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { View, Text, ScrollView, Alert, Linking } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {PHONE_NUMBER} from "@env"
import { Dimissible } from "@/components/dimissible";
import { Snackbar } from "react-native-paper";
import colors from "tailwindcss/colors";

export default function Cart(){
  const cartStore = useCartStore()
  const [address, setAddress] = useState("")
  const [snackbar, setSnackbar] = useState(false)
  const [productInCache, setProductInCache] = useState<ProductCartProps | null>(null)
  const navigation = useNavigation()

  const total = formatCurrency(cartStore.products.reduce((total, product)=>(total + product.price)*product.quantity, 0))
  
  function handleProductRemove(product:ProductCartProps){
    cartStore.remove(product.id)
    setProductInCache(product)
    setSnackbar(true)
  }

  function handleProductRestore(product: ProductCartProps){
    cartStore.insert(product)
    setProductInCache(null)
  }

  function handleOrder(){
    if(address.trim().length === 0){
      return Alert.alert("Pedido", "Informe os dados da entrega.")
    }

    const products = cartStore.products.map(product=>`\n ${product.quantity} ${product.title}`).join("")
  
    const message = `
      NOVO PEDIDO 🍔
      \n Entregar em: ${address}

      ${products}

      \n Valor total: ${total}
    `
    Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`)
    cartStore.clear()
    navigation.goBack()

  }
  
  return (
  <View className="flex-1 pt-10">
    <Header title="Seu carrinho"/>
    <KeyboardAwareScrollView>
      <ScrollView>
      <View className="p-5 flex-1"> 
        {cartStore.products.length > 0 ? 
          <View className="border-b border-slate-700">
          {cartStore.products.map(product=>{
            return (
              <Dimissible key={product.id} onDimiss={()=>handleProductRemove(product)}>
                <Product data={product}/>
              </Dimissible>
            )
          })}
        </View>
        :
        <Text className="font-body text-slate-400 text-center my-8">Seu carrinho está vazio</Text>  
      }
        <View className="flex-row gap-2 items-center mt-5 mb-4">
          <Text className="text-white text-xl font-subtitle">Total:</Text>
          <Text className="text-lime-400 text-2xl font-heading">{total}</Text>
        </View>
        <Input
          value={address}
          onChangeText={(text)=>setAddress(text)}
          placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento..."
          blurOnSubmit
          onSubmitEditing={handleOrder}
          returnKeyType="next"
        />
        </View>
        </ScrollView>
      </KeyboardAwareScrollView>
      <View className="p-5 gap-5 w-full">
        <Button onPress={handleOrder}>
          <Button.Text>Enviar pedido</Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={20}/>
          </Button.Icon>
        </Button>
        <LinkButton title="Voltar ao cardápio" href="/"/>
      </View>
      <Snackbar
        visible={snackbar}
        duration={1000}
        className="bg-red-500"
        onDismiss={()=>{
          setSnackbar(false)
          setProductInCache(null)
        }}
        action={{
          label: "DESFAZER",
          labelStyle: {color: colors.slate[900]},
          onPress:()=>handleProductRestore(productInCache!)
        }}
      ><Text className="text-white font-medium">Item removido do carrinho</Text></Snackbar>
  </View>
  )
}