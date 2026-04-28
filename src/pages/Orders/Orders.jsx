import dayjs from 'dayjs'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'
import Header from '@components/Header'
import convertCents from '../../utils/convertCents.js'
import { Fragment } from 'react'

export default function Orders({ cart, dispatch }) {
  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/api/orders?expand=products')
      return res.data
    }
  })

  const addItem = async (product) => {
    console.log(product)
    try {
      await axios.post('http://localhost:3000/api/cart-items', {
        productId: product.id,
        quantity: 1,
      })
    } catch (err) {
      console.log(err)
    }

    const existingItem = cart.find(item => item.productId === product.id)

    if (existingItem) {
      dispatch({ type: "ADD_EXISTING_PRODUCT", payload: { productId: product.id, quantity: 1 }})
    } else {
      dispatch({ type: "NEW_LOAD", payload: {product: product, quantity: 1}})
    }
  }

  if (isLoading) return <h1>Loading cart</h1>

  return (
    <>
      <Header cart={cart} />

      <div className="max-w-212.5 mx-auto mt-22.5 mb-25 px-5">
        <div className="font-bold text-[26px] mb-6.25">
          Your Orders
        </div>

        <div className="grid grid-cols-1 gap-y-12.5">
          {data.map((order) => (
            <div key={order.id}>

              {/* HEADER */}
              <div className="bg-white border border-gray-200 flex items-center justify-between px-6.25 py-5 rounded-t-md max-[575px]:flex-col max-[575px]:items-start max-[575px]:leading-5.75 max-[575px]:p-3.75">

                <div className="flex shrink-0 max-[575px]:flex-col">
                  <div className="mr-11.25 max-[575px]:mr-0 max-[575px]:grid max-[575px]:grid-cols-[auto_1fr]">
                    <div className="font-bold">Order Placed:</div>
                    <div>{dayjs(order.orderTimeMs).format('MMMM D')}</div>
                  </div>

                  <div className="mr-11.25 max-[575px]:mr-0 max-[575px]:grid max-[575px]:grid-cols-[auto_1fr]">
                    <div className="font-bold">Total:</div>
                    <div>${convertCents(order.totalCostCents)}</div>
                  </div>
                </div>

                <div className="shrink max-[575px]:grid max-[575px]:grid-cols-[auto_1fr]">
                  <div className="font-bold">Order ID:</div>
                  <div>{order.id}</div>
                </div>
              </div>

              {/* DETAILS */}
              <div className="
                grid 
                grid-cols-[110px_1fr_220px] 
                gap-x-8.75 gap-y-15
                items-center
                px-6.25 py-10
                border border-gray-200 border-t-0
                rounded-b-md
                max-[800px]:grid-cols-[110px_1fr]
                max-[800px]:gap-y-0
                max-[800px]:pb-2
                max-[450px]:grid-cols-1
              ">
                {order.products.map((item) => (
                  <Fragment key={item.productId}>

                    <div className="text-center max-[450px]:mb-6.25">
                      <img
                        src={item.product.image}
                        className="max-w-27.5 max-h-27.5 max-[450px]:max-w-37.5 max-[450px]:max-h-37.5"
                      />
                    </div>

                    <div>
                      <div className="font-bold 1.25 max-[450px]:mb-2.5">
                        {item.product.name}
                      </div>

                      <div className="mb-0.75">
                        Arriving on: {dayjs(item.estimatedDeliveryTimeMs).format('MMMM D')}
                      </div>

                      <div className="mb-2 max-[450px]:mb-3.75">
                        Quantity: {item.quantity}
                      </div>

                      <button onClick={() => addItem(item.product)} className="flex items-center justify-center w-35 h-9 text-[14px] rounded-md max-[800px]:mb-2.5 max-[450px]:w-full max-[450px]:mb-3.75 bg-green-700 text-white">
                        <img
                          className="w-5 mr-2.5"
                          src="images/icons/buy-again.png"
                        />
                        <span>Add to Cart</span>
                      </button>
                    </div>

                    <div className="self-start max-[800px]:col-start-2 max-[800px]:mb-7.5 max-[450px]:col-auto max-[450px]:mb-17.5]">
                      <Link to="/tracking">
                        <button className="w-full text-[14px] p-2 border rounded-md max-[800px]:w-35 max-[450px]:w-full max-[450px]:p-3">
                          Track package
                        </button>
                      </Link>
                    </div>

                  </Fragment>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>
    </>
  )
}