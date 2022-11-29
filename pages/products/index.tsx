import React, { useContext, useState } from "react";
import { Toaster } from "react-hot-toast";
import { getProducts } from "../../api/request";
import { Card } from "../../components/Card";
import { CartModal } from "../../components/CartModal";
import { Navbar } from "../../components/Navbar";
import { Product } from "../../types/Product";

type Props = {
  data: Product[];
};

function Home({ data }: Props) {
  const [query, setQuery] = useState<string>("");
  const [rangeValues, setRangeValue] = useState<number>(121);

  const SearchResults = () => {
    return data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filterByPrice = () => {
    return data.filter((item) => parseInt(item.price) <= rangeValues);
  };

  console.log(filterByPrice());
  // console.log(rangeValues);

  return (
    <>
      <header className="sticky top-0 h-fit z-20">
        <Navbar />
      </header>
      <main>
        <section className="max-w-[1124px] m-auto p-3">
          <div className=" w-full md:max-w-[50%]">
            <input
              type="text"
              className="bg-[#e9e9e9] w-full h-[5rem] rounded-lg text-2xl p-4  mb-8"
              placeholder="search by name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuery(e.currentTarget.value)
              }
              value={query}
            />
          </div>

        <div className="w-full md:max-w-[40%]">
        <label
            htmlFor="minmax-range"
            className="block mb-8 text-3xl font-medium text-gray-900 dark:text-white "
          >
            Price (${rangeValues} to $700) 
          </label>
          <input
            id="minmax-range"
            type="range"
            min="121"
            max="700"
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setRangeValue(parseInt(e.currentTarget.value))}
            value={rangeValues}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mb-14"
          />

        </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7">
            {filterByPrice().map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        </section>
      </main>
      <CartModal />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 1500,
          style: {
            fontSize: 14,
          },
        }}
      />
    </>
  );
}

export default Home;

export const getServerSideProps = async () => {
  const { data } = await getProducts();
  return {
    props: { data }, // will be passed to the page component as props
  };
};
