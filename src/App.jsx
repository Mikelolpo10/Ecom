import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Routes, Route } from 'react-router'
import Homepage from './pages/Homepage/homepage'
import Orders from './pages/Orders/Orders.jsx'
import Checkout from './pages/Checkout/Checkout.jsx'
import Tracking from './pages/Tracking/Tracking.jsx'
import './index.css'
import './App.css'

function App() {
  const { data: cart, isLoading: cartLoading } = useQuery({
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

  return (
    <>
      <Routes>
        <Route
          index
          element={<Homepage cart={cart} cartLoading={cartLoading}/>}
        />
        <Route 
          path='/orders'
          element={<Orders cart={cart} cartLoading={cartLoading}/>}
        />
        <Route 
          path='/checkout'
          element={<Checkout cart={cart} cartLoading={cartLoading}/>}
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
