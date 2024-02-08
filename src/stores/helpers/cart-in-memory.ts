import { ProductProps } from "@/utils/data/products";
import { ProductCartProps } from "../cart-store";

// Essa função adiciona um produto na lista de produtos no carrinho
export function add(products: ProductCartProps[], newProduct: ProductProps){
  const existingProduct = products.find(({id})=>id === newProduct.id)

  if(existingProduct){
    return products.map(
      (product)=>product.id === existingProduct.id 
      ? {...product, quantity: product.quantity + 1}
      : product
    )
  }

  return [...products, {...newProduct, quantity: 1}]
}

// Essa função remove um produto na lista de produtos no carrinho.
// Quando removidos, precisamos guardar as informações da posição e da
// quantidade do item removido para caso o usuário restaure o dado
export function remove(products: ProductCartProps[], productRemoveId: string){
  var indexProduct = 0
  var lastQuantity = 0
  const updateProducts = products.map((product, index)=>{
    if(product.id === productRemoveId){
      indexProduct = index
      lastQuantity = product.quantity
      return {
        ...product,
        quantity: 0
      }
    }
    return product
  })

  return {
    list: updateProducts.filter((product)=>product.quantity>0),
    lastQuantity,
    removedIndex: indexProduct
  }
}

// Essa função insere um produto na lista de produtos do carrinho em um index específico
// OBS: lastQuantity guarda a quantidade que o produto tinha antes de ser deletado
// OBS: lastIndex guarda a posição que o produto se encontrava na lista antes de ser deletado
export function insert(products: ProductCartProps[], insertProduct: ProductProps, lastQuantity: number, lastIndex: number){
  products.splice(lastIndex, 0, {...insertProduct, quantity: lastQuantity})
  const updateProducts = products.slice()
  return updateProducts
}