import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Routes, Route } from 'react-router'
import { useState } from 'react'
import Homepage from './pages/Homepage/homepage'
import Orders from './pages/Orders/Orders.jsx'
import Checkout from './pages/Checkout/Checkout.jsx'
import Tracking from './pages/Tracking/Tracking.jsx'
import './index.css'
import './App.css'

function App() {
  const {data, isPending, error} = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/products')
        return res.data
      } catch (err) {
        console.log(err)
      }
    }
  })

  if (error) return <h1>ERROR DATA</h1>

  if (isPending) return <h1>LOADING DATA</h1>
  console.log(data)

  return (
    <>
      <Routes>
        <Route
          index
          element={<Homepage />}
        />
        <Route 
          path='/orders'
          element={<Orders />}
        />
        <Route 
          path='/checkout'
          element={<Checkout />}
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
