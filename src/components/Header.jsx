import { NavLink } from 'react-router'
import { useEffect, useState } from 'react'
import cartQuantity from '../utils/cartQuantity'
import './Header.css'

export default function Header({ cart }) {
  const [totalItem, setTotalItem] = useState(0)

  useEffect(() => {
    setTotalItem(cartQuantity(cart))
  }, [cart])

  return (
    <>
      <div className="header">
        <div className="left-section">
          <NavLink to="/" className="header-link">
            <img className="logo" src="./images/logo-white.png" />
            <img className="mobile-logo" src="./images/mobile-logo-white.png" />
          </NavLink>
        </div>

        <div className="middle-section">
          <input className="search-bar" type="text" placeholder="Search" />

          <button className="search-button">
            <img className="search-icon" src="./images/icons/search-icon.png" />
          </button>
        </div>

        <div className="right-section">
          <NavLink className="orders-link header-link" to="/orders">
            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src="./images/icons/cart-icon.png" />
            <div className="cart-quantity">{totalItem}</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>
    </>
  )
}