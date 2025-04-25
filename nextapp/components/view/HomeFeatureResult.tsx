"use client";

import React, { useState, use } from "react";

import { useCartContext } from "../context/CartContext";
import { Spotlight } from "@/components/motion-primitives/spotlight";
export default function HomeFeatureResult({
  collectionResult,
}: {
  collectionResult: Promise<any>;
}) {
  const featured = use(collectionResult);

  const { addToCart } = useCartContext();

  return (
    <div className="px-[27px] py-[20px] border border-[#CDCDCD] rounded-[10px] flex flex-col gap-5">
      <p className="font-semibold text-[40px]">Feature</p>

      <div className="flex flex-row gap-5 relative">
        {featured && featured.collection?.products.edges.length > 0 ? (
          featured.collection?.products.edges.map((product) => (
            <div
              key={product.node.id}
              onClick={() => {
                console.log("ok");
              }}
              style={{
                backgroundImage: `url(${product.node.images?.edges[0]?.node.url})`,
              }}
              className={`relative z-1 cursor-pointer w-[220px] h-[220px] border border-gray-300 rounded-[15px] bg-cover bg-center flex flex-col justify-end p-5`}
            >
              <div className="relative flex flex-col overflow-hidden p-[2px] rounded-[15px] bg-transparent">
                <Spotlight
                  className="bg-[#F25C5C] blur-xl"
                  size={124}
                  springOptions={{
                    bounce: 0.3,
                    duration: 0.1,
                  }}
                />
                <button
                  className="relative z-10 px-[26px] py-[12px] bg-[#313131] rounded-[15px] text-white flex justify-center cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product.node.variants.edges[0].node.id);
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>hi</div>
        )}
      </div>
    </div>
  );
}
