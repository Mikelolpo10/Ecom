import dayjs from 'dayjs'
import axios from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import convertCents from '../../utils/convertCents.js'

export default function CheckoutCard({ dispatch, item }) {
  const [isEditing, setIsEditing] = useState(false)
  const [quantity, setQuantity] = useState(item.quantity)
  const [selectedDelivery, setSelectedDelivery] = useState('1')
  const { data: deliveryQuery, isLoading } = useQuery({
    queryKey: ['delivery-options'],
    queryFn: async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/delivery-options?expand=estimatedDeliveryTime')
        return res.data
      } catch (err) {
        console.log(err)
      }
    }
  })

  const mutateQuantity = useMutation({
    mutationFn: async () => {
      const res = await axios.put(`http://localhost:3000/api/cart-items/${item.productId}`, {quantity: Number(quantity)})
      return res.data
    },
    onError: (err) => {
      console.log(`Error on quantity mutation ${err}`)
    }
  })

  const updateQuantity = async () => {
    setIsEditing(!isEditing)
    mutateQuantity.mutate()
  }

  const deleteItem = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/cart-items/${item.productId}`)
      dispatch({ type: "DELETE_PRODUCT", payload: item.productId })
    } catch (err) {
      console.log(err)
    }
  }

  if (isLoading) return <h1>FETCH DELIVERY OPTIONS</h1>

  const selectedOption = deliveryQuery.find(opt => opt.id === selectedDelivery)

  return (
    <div className="border border-[rgb(222,222,222)] rounded p-4 mb-3">
      <div className="text-[rgb(25,135,84)] font-bold text-[19px] mt-[1.25px] mb-5.5">
        Delivery date: {selectedOption ? dayjs(selectedOption.estimatedDeliveryTimeMs).format('dddd, MMMM D') : 'Loading...'}
      </div>

      <div className="grid grid-cols-[100px_1fr_1fr] gap-x-6.25 max-[1000px]:grid-cols-[100px_1fr] max-[1000px]:gap-y-7.5">
        <img
          className="max-w-full max-h-30 mx-auto"
          src={item.product.image}
          alt="Product"
        />

        <div>
          <div className="font-bold mb-2">
            {item.product.name}
          </div>
          <div className="font-bold mb-[1.25px]">
            ${convertCents(item.product.priceCents)}
          </div>
          <div>
            <span>
              Quantity:
              {isEditing ?
                <input
                  type="number"
                  name="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="border-gray border w-10"
                />
                : <span className="quantity-label"> {quantity}</span>
              }
            </span>
            <span onClick={() => isEditing ? updateQuantity({quantity}) : setIsEditing(!isEditing)} className="ml-0.75 text-[rgb(0,113,133)] cursor-pointer hover:text-[rgb(199,81,31)]">
              Update
            </span>
            <span onClick={deleteItem} className="ml-0.75 text-[rgb(0,113,133)] cursor-pointer hover:text-[rgb(199,81,31)]">
              Delete
            </span>
          </div>
        </div>

        <div className="max-[1000px]:col-[1/span_2]">
          <div className="font-bold mb-2.5">
            Choose a delivery option:
          </div>
          {deliveryQuery.map(option => {
            let price = option.priceCents ? `$ ${convertCents(option.priceCents)} - Shipping` : "Free Shipping"

            return (
              <div key={option.id} className="grid grid-cols-[24px_1fr] mb-3 cursor-pointer">
                <input
                  type="radio"
                  name={`delivery-option-${item.productId}`}
                  value={option.id}
                  checked={selectedDelivery === option.id}
                  onChange={(e) => setSelectedDelivery(e.target.value)}
                  className="mt-0.75 mr-[1.25px] mb-0 ml-0 cursor-pointer"
                />
                <div>
                  <div className="font-medium mb-0.75">
                    {dayjs(option.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                  </div>
                  <div className="text-[rgb(120,120,120)] text-[15px]">
                    {price}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}