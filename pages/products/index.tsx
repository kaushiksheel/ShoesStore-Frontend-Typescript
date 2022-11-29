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

  const SearchResults = () => {
    return data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  };

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
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7">
            {SearchResults().map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        </section>
      </main>
      <CartModal />
      <Toaster
      position="top-right"
      toastOptions={{
        duration:1500,
        style:{
          fontSize:14
        }
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
