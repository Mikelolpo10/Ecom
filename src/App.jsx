import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Routes, Route } from 'react-router'
import { useState, useEffect, useReducer } from 'react'
import Homepage from './pages/Homepage/Homepage.jsx'
import Orders from './pages/Orders/Orders.jsx'
import Checkout from './pages/Checkout/Checkout.jsx'
import Tracking from './pages/Tracking/Tracking.jsx'
import './index.css'
import './App.css'

function App() {
  const { data: cartData, isLoading: cartLoading, isSuccess } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/cart-items?expand=product')
        return res.data
      } catch (err) {
        console.log(err)
      }
    }
  })

  function cartReducer(state, action) {
    switch (action.type) {
      case "FIRST_LOAD":
        return action.payload;
      case "NEW_LOAD":
        return [...state, action.payload]
      case "ADD_EXISTING_PRODUCT": {
        const newCart = state.map((item) =>
          item.productId === action.payload.productId
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        )
        return newCart
      }
      case "DELETE_PRODUCT": {
        return state.filter(item => item.productId !== action.payload) 
      }
      case "RESET_CART": {
        return []
      }     
      default: 
        return state
    }
  }


  const [cart, dispatch] = useReducer(cartReducer, [])

  useEffect(() => {
    if (isSuccess) {
      dispatch({ type: "FIRST_LOAD", payload: cartData })
    }
  }, [isSuccess, cartData])

  if (cartLoading) return <h1>CART IS BEING LOADED</h1>

  return (
    <>
      <Routes>
        <Route
          index
          element={<Homepage cart={cart} dispatch={dispatch} cartLoading={cartLoading} />}
        />
        <Route
          path='/orders'
          element={<Orders cart={cart} dispatch={dispatch} />}
        />
        <Route
          path='/checkout'
          element={<Checkout cart={cart} dispatch={dispatch} cartLoading={cartLoading} />}
        />
        <Route
          path='/tracking'
          element={<Tracking />}
        />
      </Routes>
    </>
  )
}

export default App
