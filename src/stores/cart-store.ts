import { ProductProps } from "@/utils/data/products"
import {create} from "zustand"
import * as cartInMemory from "./helpers/cart-in-memory"
import AsyncStorage from '@react-native-async-storage/async-storage'
import {createJSONStorage, persist} from "zustand/middleware"

export type ProductCartProps = ProductProps & {
  quantity: number
}

type StateProps = {
  products: ProductCartProps[]
  lastIndex: number // Serve apenas para guardar o valor da posição antiga do produto deletado
  lastQuantity: number // Serve apenas para guardar a quantidade do produto deletado
  add: (product: ProductProps)=> void
  remove: (productId: string)=>void
  clear: ()=>void
  insert: (product: ProductProps)=> void
}

export const useCartStore = create(persist<StateProps>((set, get)=>{
  return {
    products: [],
    lastIndex: 0,
    lastQuantity: 0,
    add: (product: ProductProps) => set((state)=>({
      products: cartInMemory.add(state.products, product)
    })),
    remove: (productId: string)=>{
      const newListProducts = cartInMemory.remove(get().products, productId)
      set({
        products: newListProducts.list,
        lastIndex: newListProducts.removedIndex,
        lastQuantity: newListProducts.lastQuantity
      })
    },
    clear: ()=> set({products: []}),
    insert: (product:ProductProps)=>set({
      products: cartInMemory.insert(get().products, product, get().lastQuantity, get().lastIndex)
    })
    
  }
}, {
  name: "nlw-expert:cart",
  storage: createJSONStorage(()=>AsyncStorage)

}))