import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { NavLink, Link } from 'react-router'
import CheckoutCard from './CheckoutCard.jsx'
import PaymentSummary from './PaymentSummary.jsx'
import { useEffect } from "react";

export default function Checkout({ cart, dispatch, cartLoading }) {
  const { data: payment, isLoading: paymentLoading, refetch } = useQuery({
    queryKey: ['payment'],
    queryFn: async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/payment-summary')
        return res.data
      } catch (err) {
        console.log(err)
      }
    }
  })

  useEffect(() => {
    refetch()
  }, [cart])

  if (cartLoading) return <h1>LOADING CART DATA</h1>

  return (
    <>
      <title>Checkout</title>

      {/* Checkout Header */}
      <div className="fixed top-0 left-0 right-0 z-1000 h-60px bg-white flex justify-center px-30px py-4">
        <div className="w-full max-w-275 flex items-center">
          {/* Left Section */}
          <div className="w-50 max-[575px]:w-auto">
            <NavLink to="/">
              <img
                className="h-6.5 mt-0 max-[575px]:hidden"
                src="images/logo.png"
                alt="Logo"
              />
              <img
                className="hidden max-[575px]:inline-block max-[575px]:h-6.5"
                src="images/mobile-logo.png"
                alt="Mobile Logo"
              />
            </NavLink>
          </div>

          {/* Middle Section */}
          <div className="flex-1 shrink-0 text-center text-[22px] font-medium flex justify-center max-[1000px]:text-[20px] max-[1000px]:mr-15 max-[575px]:mr-[1.25px]">
            Checkout (<Link
              className="text-[rgb(25,135,84)] no-underline cursor-pointer max-[1000px]:text-[20px]"
              to="/"
            >{payment ? payment.totalItems : '-'} items</Link>)
          </div>

          {/* Right Section */}
          <div className="text-right w-50 flex items-center justify-end max-[1000px]:w-auto">
            <img
              className="h-8"
              src="images/icons/checkout-lock-icon.png"
              alt="Lock"
            />
          </div>
        </div>
      </div>

      {/* Checkout Page */}
      <div className="max-w-275 px-7.5 mt-35 mb-25 mx-auto">
        <div className="font-bold text-[22px] mb-4">
          Review your order
        </div>

        <div className="grid grid-cols-[1fr_350px] gap-x-3 items-start max-[1000px]:grid-cols-1">
          <div>
            {cart.map((item, index) => {
              return (
                <CheckoutCard key={item.productId + index} dispatch={dispatch} item={item} />
              )
            })}
          </div>

          <PaymentSummary cart={cart} dispatch={dispatch} payment={payment} paymentLoading={paymentLoading} />
        </div>
      </div>
    </>
  )
}