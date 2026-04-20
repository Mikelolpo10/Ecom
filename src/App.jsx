import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Routes, Route } from 'react-router'
import { useState, useEffect } from 'react'
import Homepage from './pages/Homepage/Homepage.jsx'
import Orders from './pages/Orders/Orders.jsx'
import Checkout from './pages/Checkout/Checkout.jsx'
import Tracking from './pages/Tracking/Tracking.jsx'
import './index.css'
import './App.css'

function App() {
  const [cart, setCart] = useState(null)

  const { data: cartData, isLoading: cartLoading, isSuccess } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/cart-items')
        return res.data
      } catch (err) {
        console.log(err)
      }
    }
  }) 
  console.log(cart)

  useEffect(() => {
    if (isSuccess) {
      setCart(cartData)
    }
  }, [isSuccess, cartData])

  if (cartLoading) return <h1>CART IS BEING LOADED</h1>

  return (
    <>
      <Routes>
        <Route
          index
          element={<Homepage cart={cart} setCart={setCart} cartLoading={cartLoading}/>}
        />
        <Route 
          path='/orders'
          element={<Orders cart={cart} cartLoading={cartLoading}/>}
        />
        <Route 
          path='/checkout'
          element={<Checkout cartData={cartData} setCart={setCart} cartLoading={cartLoading}/>}
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
