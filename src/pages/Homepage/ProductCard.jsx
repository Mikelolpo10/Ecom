import axios from 'axios'
import { use, useState } from 'react'
import convertCents from '../../utils/convertCents'

export default function ProductCard({ cart, dispatch, product }) {
  const [quantity, setQuantity] = useState(1)

  const selectQuantity = (e) => {
    const quantitySelected = Number(e.target.value)
    setQuantity(quantitySelected)
  }

  const addItem = async () => {
    try {
      await axios.post('http://localhost:3000/api/cart-items', {
        productId: product.id,
        quantity: quantity,
      })
    } catch (err) {
      console.log(err)
    }

    const existingItem = cart.find(item => item.productId === product.id)

    if (existingItem) {
      dispatch({ type: "ADD_EXISTING_PRODUCT", payload: { productId: product.id, quantity: quantity }})
    } else {
      dispatch({ type: "NEW_LOAD", payload: {product: product, quantity: quantity}})
    }
  }

  return (
    <div
      key={product.id}
      className="flex flex-col pt-10 pb-6 px-6 border-r border-b border-gray-200"
    >
      <div className="flex justify-center items-center h-45 mb-5">
        <img
          className="max-w-full max-h-full rounded-[5px]"
          src={`${product.image}`}
          alt={product.name}
        />
      </div>

      <div className="h-11.25 mb-1 line-clamp-2">
        {product.name}
      </div>

      <div className="flex items-center mb-2.5">
        <img
          className="w-25 mr-1.5"
          src={`./images/ratings/rating-${product.rating.stars * 10}.png`}
          alt={`${product.rating.stars} stars`}
        />
        <div className="text-green-600 mt-0.75">
          {product.rating.count}
        </div>
      </div>

      <div className="font-bold mb-2.5">
        ${convertCents(product.priceCents)}
      </div>

      <div className="mb-4.25">
        <select value={quantity} onChange={selectQuantity} className="border border-gray-300 rounded px-2 py-1">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="flex-1"></div>

      <div className="text-green-600 text-base flex items-center mb-2 opacity-0">
        <img
          src="./images/icons/checkmark.png"
          alt="checkmark"
          className="h-4.75 mr-1.5"
        />
        Added
      </div>

      <button onClick={() => addItem()} className="w-full py-2 h-8.5 mt-px bg-amber-300 hover:bg-amber-400 text-gray-900 rounded-full font-medium transition-colors">
        Add to Cart
      </button>
    </div>
  )
}