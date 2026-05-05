import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/jest-dom'
import ProductCard from './ProductCard'

describe('Product card component', () => {
  it('displays the product details', () => {
    render(<ProductCard />)
  })
})