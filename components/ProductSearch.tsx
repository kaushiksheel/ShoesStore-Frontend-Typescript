import React from 'react'

type Props={
    query:string;
    setQuery:(query:string)=>void;
}

export const ProductSearch = ({setQuery,query}:Props) => {
  return (
    <div className=" w-full md:max-w-[50%]">
    <input
      type="text"
      className="bg-[#e9e9e9] w-full h-[5rem] rounded-lg text-2xl p-4  mb-8 focus:outline-none"
      placeholder="search by name"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setQuery(e.currentTarget.value)
      }
      value={query}
    />
  </div>
  )
}
