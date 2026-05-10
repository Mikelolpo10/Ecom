import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CheckoutCard from './Checkout.jsx'

describe('Checkout card component', () => {
  it('display card info', () => {
    const dispatchMock = vi.fn()
    const item = {
      "id": 94,
      "productId": "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      "quantity": 5,
      "deliveryOptionId": "1",
      "createdAt": "2026-05-04T10:37:10.796Z",
      "updatedAt": "2026-05-04T10:41:39.114Z",
      "product": {
        "keywords": [
          "tshirts",
          "apparel",
          "mens"
        ],
        "id": "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        "image": "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
        "name": "Adults Plain Cotton T-Shirt - 2 Pack",
        "rating": {
          "stars": 4.5,
          "count": 56
        },
        "priceCents": 799,
        "createdAt": "2026-04-17T11:03:04.011Z",
        "updatedAt": "2026-04-17T11:03:04.011Z"
      }
    };

    render(<CheckoutCard dispatch={dispatchMock} item={item} />)
  })
})