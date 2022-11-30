import { AxiosError } from "axios";
import jwtDecode from "jwt-decode";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { signup } from "../api/request";
import { Spinner } from "../components/Spinner";
import { AuthContext } from "../context/AuthContext";
import { AuthContextType } from "../types/AuthContextType";
import { UserType } from "../types/UserType";

function Signup() {
  const { setCurrentUser } = useContext<AuthContextType>(AuthContext);
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignup = async () => {
    setLoading(true);
    try {
      const { data } = await signup(fullname, email, password);
      setLoading(false);
      const decodedToken = jwtDecode(data);
      setCurrentUser(decodedToken as UserType);
      localStorage.setItem("token", data);
      if (typeof window !== "undefined")
        return (window.location = "/products" as any);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setLoading(false);
        toast.error(error?.response?.data);
      }
    }
  };
  return (
    <>
      <div className="w-[100vw] min-h-[100vh] bg-[#FAFAFA] grid place-content-center">
        <div className="bg-white p-[3rem] rounded-[.75rem] w-[380px] md:w-[528px] shadow-lg">
          <header className="flex items-center justify-between">
            <p className="text-[2rem] font-semibold">Sign up</p>
            <p className="text-[1.6rem] ">
              Have an account?{" "}
              <Link href="/login" className="font-semibold">
                Sign in
              </Link>
            </p>
          </header>
          <div className="mt-[5rem]">
            <label
              className="text-[1.6rem] text-[#18181B] font-[400]"
              htmlFor="username"
            >
              Fullname
            </label>
            <input
              type="text"
              id="username"
              className="w-full border-[1px] border-[#A1A1AA] h-[5.8rem] rounded-[1.1rem] my-4 text-[1.5rem] p-4"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFullname(e.currentTarget.value)
              }
              value={fullname}
            />
            <label
              className="text-[1.6rem] text-[#18181B] font-[400]"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border-[1px] border-[#A1A1AA] h-[5.8rem] rounded-[1.1rem] my-4 text-[1.5rem] p-4"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.currentTarget.value)
              }
              value={email}
            />
            <label
              className="text-[1.6rem] text-[#18181B] font-[400]"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full border-[1px] border-[#A1A1AA] h-[5.8rem] rounded-[1.1rem] my-4 text-[1.5rem] p-4"
              type="password"
              id="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.currentTarget.value)
              }
              value={password}
            />
            <button
              onClick={handleSignup}
              className="mt-8 text-[1.7rem] bg-[#18181B] w-full p-[1.8rem] text-white rounded-[1.3rem]"
            >
              {loading?<Spinner size={20}/>: 'Sign up'}

            </button>
          </div>
        </div>
      </div>
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

export default Signup;
