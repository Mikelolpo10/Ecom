import { useQueryClient, useMutation } from "@tanstack/react-query"
import putMutateDelivery from "../api/putMutateDelivery"

export default function useMutateDelivery(productId) {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (option) => putMutateDelivery(productId, option),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      queryClient.invalidateQueries({ queryKey: ['payment-summary'] })
    },
    onError: (err) => {
      console.log(`Error on delivery option mutation ${err}`)
    }
  })
}