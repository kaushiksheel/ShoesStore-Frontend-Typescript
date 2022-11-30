import React from 'react'

type Props={
    rangeValue:number;
    setRangeValue:(rangeValue:number)=>void
}

export const RangeInput = ({rangeValue,setRangeValue}:Props) => {
  return (
    <div className="w-full md:max-w-[40%]">
    <label
        htmlFor="minmax-range"
        className="block mb-8 text-3xl font-medium text-gray-900 dark:text-white "
      >
        Price (${rangeValue} to $700) 
      </label>
      <input
        id="minmax-range"
        type="range"
        min="121"
        max="700"
        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setRangeValue(parseInt(e.currentTarget.value))}
        value={rangeValue}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mb-14"
      />

    </div>
  )
}
