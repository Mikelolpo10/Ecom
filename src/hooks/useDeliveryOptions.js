import { useQuery } from "@tanstack/react-query"
import getDeliveryOptions from '../api/getDeliveryOptions.js'

export default function useDeliveryOptions() {
  return useQuery({
    queryKey: ['delivery-options'],
    queryFn: getDeliveryOptions
  })
}