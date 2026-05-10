import axios from "axios"

export default async function getDeliveryOptions() {
  const res = await axios.get('http://localhost:3000/api/delivery-options?expand=estimatedDeliveryTime')
  return res.data
}