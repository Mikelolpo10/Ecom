import axios from 'axios'
import Header from '@components/header.jsx'
import convertCents from '../../utils/convertCents'
import { products } from '../../data/products'

export default function Homepage() {
  return (
    <>
      <Header />

      <div className="mt-[60px]">
        <div className="grid grid-cols-1 min-[450px]:grid-cols-2 min-[575px]:grid-cols-2 min-[800px]:grid-cols-3 min-[1000px]:grid-cols-4 min-[1300px]:grid-cols-5 min-[1600px]:grid-cols-6 min-[2000px]:grid-cols-7 min-[2001px]:grid-cols-8">
          {products.map((product) => {
            return (
              <div 
                key={product.id}
                className="flex flex-col pt-10 pb-6 px-6 border-r border-b border-gray-200"
              >
                <div className="flex justify-center items-center h-[180px] mb-5">
                  <img 
                    className="max-w-full max-h-full rounded-[5px]" 
                    src={`${product.image}`}
                    alt={product.name}
                  />
                </div>

                <div className="h-[45px] mb-1 line-clamp-2">
                  {product.name}
                </div>

                <div className="flex items-center mb-2.5">
                  <img 
                    className="w-[100px] mr-1.5" 
                    src={`./images/ratings/rating-${product.rating.stars * 10}.png`}
                    alt={`${product.rating.stars} stars`}
                  />
                  <div className="text-green-600 mt-[3px]">
                    {product.rating.count}
                  </div>
                </div>

                <div className="font-bold mb-2.5">
                  ${convertCents(product.priceCents)}
                </div>

                <div className="mb-[17px]">
                  <select className="border border-gray-300 rounded px-2 py-1">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>

                <div className="flex-1"></div>

                <div className="text-green-600 text-base flex items-center mb-2 opacity-0">
                  <img 
                    src="./images/icons/checkmark.png" 
                    alt="checkmark"
                    className="h-[19px] mr-1.5"
                  />
                  Added
                </div>

                <button className="w-full py-2 h-[34px] mt-[1px] bg-amber-300 hover:bg-amber-400 text-gray-900 rounded-full font-medium transition-colors">
                  Add to Cart
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}