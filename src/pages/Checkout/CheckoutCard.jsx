import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import convertCents from '../../utils/convertCents.js'

export default function CheckoutCard({cart, dispatch, item}) {
  const deleteItem = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/cart-items/${item.productId}`)
      dispatch({ type: "DELETE_PRODUCT", payload: item.productId })
    } catch (err) {
      console.log(err)
    }
  }
  
  return (
    <div className="border border-[rgb(222,222,222)] rounded p-4 mb-3">
      <div className="text-[rgb(25,135,84)] font-bold text-[19px] mt-[1.25px] mb-5.5">
        Delivery date: Tuesday, June 21
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
              Quantity: <span className="quantity-label">{item.quantity}</span>
            </span>
            <span className="ml-0.75 text-[rgb(0,113,133)] cursor-pointer hover:text-[rgb(199,81,31)]">
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
          <div className="grid grid-cols-[24px_1fr] mb-3 cursor-pointer">
            <input
              type="radio"
              checked
              className="mt-0.75 mr-[1.25px] mb-0 ml-0 cursor-pointer"
              name="delivery-option-1"
              readOnly
            />
            <div>
              <div className="font-medium mb-0.75">
                Tuesday, June 21
              </div>
              <div className="text-[rgb(120,120,120)] text-[15px]">
                FREE Shipping
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[24px_1fr] mb-3 cursor-pointer">
            <input
              type="radio"
              className="mt-0.75 mr-[1.25px] mb-0 ml-0 cursor-pointer"
              name="delivery-option-1"
            />
            <div>
              <div className="font-medium mb-0.75">
                Wednesday, June 15
              </div>
              <div className="text-[rgb(120,120,120)] text-[15px]">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[24px_1fr] mb-3 cursor-pointer">
            <input
              type="radio"
              className="mt-0.75 mr-[1.25px] mb-0 ml-0 cursor-pointer"
              name="delivery-option-1"
            />
            <div>
              <div className="font-medium mb-0.75">
                Monday, June 13
              </div>
              <div className="text-[rgb(120,120,120)] text-[15px]">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}