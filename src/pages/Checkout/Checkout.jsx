import { NavLink, Link } from 'react-router'
import CheckoutCard from './CheckoutCard.jsx'
import cartQuantity from '../../utils/cartQuantity.js'

export default function Checkout({ cart, dispatch, cartLoading }) {
  const totalItem = cartQuantity(cart)
  
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
            >{totalItem} items</Link>)
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
            {cart.map((item) => {
              return (
                <CheckoutCard key={item.productId} dispatch={dispatch} item={item} />
              )
            })}
          </div>

          {/* Payment Summary */}
          <div className="border border-[rgb(222,222,222)] rounded p-4 pb-2 max-[1000px]:row-1 max-[1000px]:mb-3">
            <div className="font-bold text-lg mb-3">
              Payment Summary
            </div>

            <div className="grid grid-cols-[1fr_auto] text-[15px] mb-2.25">
              <div>Items ({totalItem}):</div>
              <div className="text-right">$42.75</div>
            </div>

            <div className="grid grid-cols-[1fr_auto] text-[15px] mb-2.25">
              <div>Shipping &amp; handling:</div>
              <div className="text-right">$4.99</div>
            </div>

            <div className="grid grid-cols-[1fr_auto] text-[15px] mb-2.25">
              <div className="pt-[2.25px]">Total before tax:</div>
              <div className="text-right pt-[2.25px] border-t border-[rgb(222,222,222)]">$47.74</div>
            </div>

            <div className="grid grid-cols-[1fr_auto] text-[15px] mb-2.25">
              <div>Estimated tax (10%):</div>
              <div className="text-right">$4.77</div>
            </div>

            <div className="grid grid-cols-[1fr_auto] text-[rgb(25,135,84)] font-bold text-lg border-t border-[rgb(222,222,222)] pt-[px-4.5]">
              <div>Order total:</div>
              <div className="text-right">$52.51</div>
            </div>

            <button className="w-full pt-3 pb-3 rounded-[1.25px] mt-5 mb-4.75 bg-[rgb(255,216,20)] border-none text-[15px] cursor-pointer hover:bg-[rgb(247,202,0)]">
              Place your order
            </button>
          </div>
        </div>
      </div>
    </>
  )
}