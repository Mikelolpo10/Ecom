import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import Header from '@components/header.jsx'
import ProductCard from './ProductCard'

export default function Homepage({ cart, dispatch, cartLoading }) {
  const { data: products, isLoading, error } = useQuery({
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

  if (isLoading || cartLoading) return <h1>LOADING DATA</h1>

  return (
    <>
      <Header cart={cart}/>

      <div className="mt-15">
        <div className="grid grid-cols-1 min-[450px]:grid-cols-2 min-[575px]:grid-cols-2 min-[800px]:grid-cols-3 min-[1000px]:grid-cols-4 min-[1300px]:grid-cols-5 min-[1600px]:grid-cols-6 min-[2000px]:grid-cols-7 min-[2001px]:grid-cols-8">
          {products.map((product) => {
            return (
              <ProductCard key={product.id} cart={cart} dispatch={dispatch} product={product}/>
            )
          })}
        </div>
      </div>
    </>
  )
}