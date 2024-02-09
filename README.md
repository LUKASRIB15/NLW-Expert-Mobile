<h1 align="center">NLW Expert</h1>

Esse projeto foi realizado durante o evento da rocketseat chamado NLW Expert e, como estou em busca de novos conhecimentos na área de desenvolvimento, resolvi seguir as aulas sobre React Native para mobile.

OBS: Nesse projeto contém algumas melhorias/alterações realizadas por mim

<br/>

# 🚀 Tecnologias

Projeto desenvolvido com as seguintes tecnologias:

- React Native
- TypeScript
- Tailwindcss
- Jest
- Moti
- Expo
- Async Storage
- Zustand
- Figma
- Git e Github

<br>

# 💻 Principais issues

- Desenvolvimento do design utilizando o Tailwindcss
- Persistência dos dados
- Gerenciamento de dados com o zustand 
- Navegação de telas com expo-router

# 👨‍💻 Melhorias que implementei

- Algumas animações utilizando o moti
- Usando variáveis de ambiente para dados sensíveis com dotenv
- Animações e gestos para micro-interações
- Melhoria nas transições de tela no expo-router
- Realizando teste unitários com o Jest
- Utilizando Snackbar

<br/>

<h2>Versão Mobile:</h2> 

<br/>

### Tela: Faça seu pedido
![image](https://github.com/LUKASRIB15/NLW-Expert-Mobile/assets/100320271/ab0782af-8c95-4a02-b1e3-bba3bf004cb3)

### Tela: Detalhe do produto
![image](https://github.com/LUKASRIB15/NLW-Expert-Mobile/assets/100320271/a277ac94-ded0-45fc-bd30-82c78da97e0a)

### Tela: Carrinho
![image](https://github.com/LUKASRIB15/NLW-Expert-Mobile/assets/100320271/f085e0d2-6fda-4ac6-bac6-17ed4b8feb37)

# 👨‍💻 Usando Jest 

Uso do Jest na aplicação:
````` typescript
// Arquivo stores/tests/cart-store.spec.ts

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
`````
<br>

### Utilizei como principais ferramentas:
<div style="display:inline-block">
  <img align="center" alt="Lucas-Ts" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-plain.svg">
  <img align="center" alt="Lucas-React" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg">
  <img align="center" alt="Lucas-React" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg">
  <img align="center" alt="Lucas-React" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg">
</div>
