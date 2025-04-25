"use client";

import React, { useState } from "react";
import { Montserrat } from "next/font/google";
import { useCartContext } from "../context/CartContext";
import { AnimatedBackground } from "../motion-primitives/animated-background";

import Link from "next/link";
const montserrat = Montserrat({
  weight: "300",
  subsets: ["latin"],
});
export default function NavigationResult() {
  const TABS = ["Home", "Products", "Contact"];
  const [selectedTab, setSelectedTab] = useState(TABS[0]);
  const { setIsCartOpen } = useCartContext();

  return (
    <>
      <div
        className={`${montserrat.className} flex flex-row justify-between py-[21px] px-[27px] bg-[#313131] rounded-[10px] text-white`}
      >
        <div className="flex flex-row items-center gap-[44px]">
          <p className="font-semibold text-lg">Ecommerce</p>
          
          <AnimatedBackground
            defaultValue={selectedTab}
            onValueChange={(newActiveId) => {
              setSelectedTab(newActiveId!);
            }}
            className="rounded-lg bg-white "
            enableHover={false}
            transition={{
              type: 'spring',
              bounce: 0.2,
              duration: 0.3,
            }}
          >
            {TABS.map((tab, index) => (
              <Link
                key={index}
                data-id={tab}
                className="px-3 py-2 text-md font-semibold text-zinc-300 transition-colors duration-300 hover:text-white data-[checked=true]:text-black "
                href={`/${tab == "Home" ? "" : tab.toLowerCase()}`}
              >
                {tab}
              </Link>
            ))}
          </AnimatedBackground>
          
          
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
