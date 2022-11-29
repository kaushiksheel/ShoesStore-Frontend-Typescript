import Image from 'next/image'
import React from 'react'

export const OrderedItem = () => {
  return (
    <div className="flex justify-between items-center md:max-w-[80%] mt-5">
    <Image
    src="http://localhost:3000/_next/image?url=https%3A%2F%2Fimages.puma.com%2Fimage%2Fupload%2Ff_auto%2Cq_auto%2Cb_rgb%3Afafafa%2Cw_750%2Ch_750%2Fglobal%2F381374%2F01%2Fsv01%2Ffnd%2FIND%2Ffmt%2Fpng%2FJako-Slip-On-Men%27s-Shoes&w=640&q=75"
    alt='shoe'
    width={100}
    height={100}
    className='object-contain'
    />
    <p className='text-2xl font-semibold'>Puma x virat kohli</p>
    <p className='text-2xl font-semibold'>$342</p>
    <div className="flex items-center gap-x-2">
    <div className='w-4 h-4 rounded-full bg-green-500'></div>
    <p className='text-2xl font-semibold text-gray-500'> Ordered on 32 aug</p>
    </div>
  </div>
  )
}
