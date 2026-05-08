import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductCard from './ProductCard'

vi.mock('axios')

describe('Product card component', () => {
  const product = {
    "keywords": [
      "socks",
      "sports",
      "apparel"
    ],
    "id": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    "image": "images/products/athletic-cotton-socks-6-pairs.jpg",
    "name": "Black and Gray Athletic Cotton Socks - 6 Pairs",
    "rating": {
      "stars": 4.5,
      "count": 87
    },
    "priceCents": 1090,
    "createdAt": "2026-04-17T11:03:04.009Z",
    "updatedAt": "2026-04-17T11:03:04.009Z"
  }

  it('displays the product details', () => {
    const mockDispatch = vi.fn()

    render(<ProductCard dispatch={mockDispatch} product={product} />)

    expect(screen.getByText('$10.90')).toBeInTheDocument()
  })

  it('adds a product to cart', async () => {
    const mockDispatch = vi.fn()
    const mockCart = [
      {
        product: {
          id: 1,
        },
        quantity: 2,
      },
    ]

    render(<ProductCard dispatch={mockDispatch} cart={mockCart} product={product} />)

    const user = userEvent.setup()
    await user.click(screen.getByTestId('add-to-cart-btn'))
  })
})