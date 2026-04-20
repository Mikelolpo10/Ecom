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
  const cartQuery = useQuery({
    queryKey: 'cart',
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
          element={<Homepage cart={cartQuery}/>}
        />
        <Route 
          path='/orders'
          element={<Orders cart={cartQuery}/>}
        />
        <Route 
          path='/checkout'
          element={<Checkout cart={cartQuery}/>}
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
