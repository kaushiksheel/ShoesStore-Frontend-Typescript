
import React from 'react'
import { Navbar } from '../components/Navbar'
import { OrderedItem } from '../components/OrderedItem'

function orders() {
  return (
<>
<header>
  <Navbar/>
  <main className='max-w-[1124px] p-3 m-auto'>
   <OrderedItem/>
   <OrderedItem/>
  </main>
</header>
</>
  )
}

export default orders