export default function useCartQuantity(cart) {
  let total = 0

  cart.forEach((product) => {
    total += product.quantity  
  })
  
  return total
}

