import axios from "axios"

export default async function putMutateDelivery(productId, option) {
  const res = await axios.put(`http://localhost:3000/api/cart-items/${productId}`, { deliveryOptionId: option })
  return res.data
}