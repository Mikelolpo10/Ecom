import { Routes, Route } from 'react-router'
import { useState } from 'react'
import Homepage from './pages/Homepage/homepage'
import Orders from './pages/Orders/Orders.jsx'
import Checkout from './pages/Checkout/Checkout.jsx'
import Tracking from './pages/Tracking/Tracking.jsx'
import './index.css'
import './App.css'

function App() {

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
