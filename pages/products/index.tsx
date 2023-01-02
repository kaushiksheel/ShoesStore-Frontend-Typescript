import React, { useContext, useState } from "react";
import { Toaster } from "react-hot-toast";
import { getProducts } from "../../api/request";
import { Card } from "../../components/Card";
import { CartModal } from "../../components/CartModal";
import { Navbar } from "../../components/Navbar";
import { ProductSearch } from "../../components/ProductSearch";
import { RangeInput } from "../../components/RangeInput";
import { Product } from "../../types/Product";
import {motion} from 'framer-motion';
import { container_variant } from "../../helpers/framer-motion";

type Props = {
  data: Product[];
};

function Home({ data }: Props) {
  const [query, setQuery] = useState<string>("");
  const [rangeValue, setRangeValue] = useState<number>(122);

  const SearchResults = () => {
    return data?.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filterByPrice = () => {
    return data.filter((item) => parseInt(item.price) <= rangeValue);
  };


 

  return (
    <>
      <header className="sticky top-0 h-fit z-20">
        <Navbar />
      </header>
      <main>
        <section className="max-w-[1124px] m-auto p-3">
          <ProductSearch setQuery={setQuery} query={query} />
          <RangeInput rangeValue={rangeValue} setRangeValue={setRangeValue} />
          <motion.div
           className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7"
           variants={container_variant}
           initial="hidden"
    animate="visible"
           >
            {rangeValue > 122 &&
              filterByPrice().map((item) => <Card key={item.id} item={item} />)}
            {SearchResults().map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </motion.div>
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
