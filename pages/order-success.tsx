import Link from "next/link";
import React from "react";
import Lottie from "react-lottie";
import animationData from "../public/9909-order-success.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function OrderSuccess() {
  return (
    <div className="w-[100vw] h-[100vh] grid place-content-center">
      <div className="text-center mt-14">
        <Lottie options={defaultOptions} height={300} width={300} />
        <p  className="text-5xl font-semibold  mb-11">Order Successfull</p>
        <Link href='/products' className="text-3xl font-semibold hover:underline">Go back to home</Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
