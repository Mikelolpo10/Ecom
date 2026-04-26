import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import convertCents from "../../utils/convertCents";

export default function PaymentSummary({ cart, dispatch, payment, paymentLoading }) {
  const placeOrder = useMutation({
    mutationFn: () => {axios.post('http://localhost:3000/api/orders')},
    onSuccess: () => {dispatch({type: "RESET_CART"})}
  })
  
  if (paymentLoading) return <h1>Loading payment data</h1>

  return (
    <div className="border border-[rgb(222,222,222)] rounded p-4 pb-2 max-[1000px]:row-1 max-[1000px]:mb-3">
      <div className="font-bold text-lg mb-3">
        Payment Summary
      </div>

      <div className="grid grid-cols-[1fr_auto] text-[15px] mb-2.25">
        <div>Items ({payment.totalItems}):</div>
        <div className="text-right">${convertCents(payment.productCostCents)}</div>
      </div>

      <div className="grid grid-cols-[1fr_auto] text-[15px] mb-2.25">
        <div>Shipping &amp; handling:</div>
        <div className="text-right">${convertCents(payment.shippingCostCents)}</div>
      </div>

      <div className="grid grid-cols-[1fr_auto] text-[15px] mb-2.25">
        <div className="pt-[2.25px]">Total before tax:</div>
        <div className="text-right pt-[2.25px] border-t border-[rgb(222,222,222)]">${convertCents(payment.totalCostBeforeTaxCents)}</div>
      </div>

      <div className="grid grid-cols-[1fr_auto] text-[15px] mb-2.25">
        <div>Estimated tax (10%):</div>
        <div className="text-right">${convertCents(payment.taxCents)}</div>
      </div>

      <div className="grid grid-cols-[1fr_auto] text-[rgb(25,135,84)] font-bold text-lg border-t border-[rgb(222,222,222)] pt-[px-4.5]">
        <div>Order total:</div>
        <div className="text-right">${convertCents(payment.totalCostCents)}</div>
      </div>

      <button onClick={() => placeOrder.mutate()} className="w-full pt-3 pb-3 rounded-[1.25px] mt-5 mb-4.75 bg-[rgb(255,216,20)] border-none text-[15px] cursor-pointer hover:bg-[rgb(247,202,0)]">
        Place your order
      </button>
    </div>
  )
}