export default function cartQuantity(cart) {
  let total = 0

  cart.forEach((product) => {
    total += product.quantity  
  })
  
  return total
}

