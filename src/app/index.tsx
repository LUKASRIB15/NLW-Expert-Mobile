import { CategoryButton } from "@/components/category-button"
import { Header } from "@/components/header"
import {View, Text, FlatList, SectionList} from "react-native"
import { CATEGORIES, MENU, ProductProps } from "@/utils/data/products"
import { useState, useRef, useEffect } from "react"
import { Product } from "@/components/product"
import {Link} from "expo-router"
import { useCartStore } from "@/stores/cart-store"
import {MotiView} from "moti"
export default function Home(){

  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0])
  const sectionListRef = useRef<SectionList<ProductProps>>(null)
  const cartStore = useCartStore()

  const cartQuantityItems = cartStore.products.reduce((total, product)=> total + product.quantity, 0)

  function handleCategorySelect(selectedCategory: string){
    setSelectedCategory(selectedCategory)
    const sectionIndex = CATEGORIES.findIndex((category)=>{
      return category === selectedCategory
    })

    if(sectionListRef.current){
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0
      })
    }
  }
  return (
    <View className="pt-10 flex-1">
      <Header title="Faça seu pedido" cardQuantity={cartQuantityItems}/>
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item)=>item}
        renderItem={({item})=>(
          <CategoryButton title={item} onPress={()=>handleCategorySelect(item)} isSelected={selectedCategory===item}/>
        )}
        horizontal
        className="max-h-10 mt-5"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{gap: 12, paddingHorizontal: 20}}
      />
      <MotiView className="flex-1"
        from={{
          opacity: 0,
          translateY: 500
        }}
        animate={{
          opacity: 1,
          translateY: 0
        }}
        transition={{
          type: "timing",
          duration: 500
        }}
      >
          <SectionList
            ref={sectionListRef} 
            sections={MENU}
            keyExtractor={(item)=>item.id}
            stickySectionHeadersEnabled={false}
            renderItem={({item})=>{
              return <Link href={`/products/${item.id}`} asChild>
                <Product data={item}/>
              </Link>
            }}
            renderSectionHeader={({section})=>{
              return <Text className="text-xl text-white font-heading mt-8 mb-3">{section.title}</Text>
            }}
            className="p-5"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 100}}
          />
        
      </MotiView>
    </View>
  )
}