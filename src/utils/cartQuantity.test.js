import { it, expect, describe } from 'vitest'
import cartQuantity from './cartQuantity.js'

describe('cartQuantity', () => {
  it('return cart quantity', () => {
    expect(cartQuantity([
      {
        "id": 62,
        "productId": "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        "quantity": 3,
        "deliveryOptionId": "1",
        "createdAt": "2026-04-29T02:46:59.669Z",
        "updatedAt": "2026-04-29T02:46:59.994Z"
      },
      {
        "id": 63,
        "productId": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        "quantity": 7,
        "deliveryOptionId": "1",
        "createdAt": "2026-04-29T02:47:28.475Z",
        "updatedAt": "2026-04-29T02:48:10.508Z"
      },
      {
        "id": 64,
        "productId": "54e0eccd-8f36-462b-b68a-8182611d9add",
        "quantity": 5,
        "deliveryOptionId": "1",
        "createdAt": "2026-04-29T02:47:30.091Z",
        "updatedAt": "2026-04-29T02:48:11.596Z"
      },
      {
        "id": 65,
        "productId": "6b07d4e7-f540-454e-8a1e-363f25dbae7d",
        "quantity": 3,
        "deliveryOptionId": "1",
        "createdAt": "2026-04-29T02:48:14.458Z",
        "updatedAt": "2026-04-29T02:48:14.788Z"
      },
      {
        "id": 66,
        "productId": "82bb68d7-ebc9-476a-989c-c78a40ee5cd9",
        "quantity": 4,
        "deliveryOptionId": "1",
        "createdAt": "2026-04-29T02:48:23.390Z",
        "updatedAt": "2026-04-29T02:48:23.868Z"
      }
    ])).toBe(22)
  });
})






