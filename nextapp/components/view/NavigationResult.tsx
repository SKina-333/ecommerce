"use client";

import React from "react";
import { Montserrat } from "next/font/google";
import { useCartContext } from "../context/CartContext";

import Link from "next/link";
const montserrat = Montserrat({
  weight: "300",
  subsets: ["latin"],
});
export default function NavigationResult() {
  const TABS = ["Home", "Featured", "Products", "Blog", "Contact"];
  const { isCartOpen, setIsCartOpen, cartLines, checkoutUrl } =
    useCartContext();

  return (
    <>
      <div
        className={`${montserrat.className} flex flex-row justify-between py-[21px] px-[27px] bg-[#313131] rounded-[10px] text-white`}
      >
        <div className="flex flex-row items-center gap-[44px]">
          <p className="font-semibold text-lg">Ecommerce</p>

          {TABS.map((tab, index) => (
            <Link
              key={index}
              data-id={tab}
              className="p-2 hover:bg-zinc-400 hover:text-zinc-900 rounded-[5px] transition "
              href={`/${tab == "Home" ? "" : tab.toLowerCase()}`}
            >
              {tab}
            </Link>
          ))}
        </div>
        <div className="flex flex-row items-center gap-[16px]">
          <a>Login</a>
          <a className="px-[16px] py-[7px] bg-[#F25C5C] rounded-[4px]">
            Sign up
          </a>
          <button
            onClick={() => {
              setIsCartOpen(true);
            }}
          >
            cart
          </button>
        </div>
      </div>
      
    </>
  );
}
