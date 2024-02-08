import { PRODUCTS } from "@/utils/data/products"
import { useCartStore } from "../cart-store"

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe("Testing if cart-store is working as expected", ()=>{
  test("Adding item in cart-store", ()=>{
    const {add} = useCartStore.getState()
    add(PRODUCTS[0])
    add(PRODUCTS[0])
    add(PRODUCTS[1])
    const {products} = useCartStore.getState()
    expect(products).toEqual([{...PRODUCTS[0], quantity: 2}, {...PRODUCTS[1], quantity: 1}])
  })

  test("Removing an item in cart-store", ()=>{
    const {remove} = useCartStore.getState()
    remove(PRODUCTS[0].id)
    const {products} = useCartStore.getState()
    expect(products).toEqual([{...PRODUCTS[1], quantity: 1}])
  })

  test("Restoring an item deleted to the cart-store", ()=>{
    const {insert} = useCartStore.getState()
    insert(PRODUCTS[0])
    const {products} = useCartStore.getState()
    expect(products).toEqual([{...PRODUCTS[0], quantity: 2}, {...PRODUCTS[1], quantity: 1}])
  })

  test("Clearing the array of products in cart-store", ()=>{
    const {clear} = useCartStore.getState()
    clear()
    const {products} = useCartStore.getState()
    expect(products).toEqual([]) 
  })
})