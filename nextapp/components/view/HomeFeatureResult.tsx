"use client";

import React, { useState, use } from "react";

import { useCartContext } from "../context/CartContext";

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

      <div className="flex flex-row gap-5">
        {featured && featured.collection?.products.edges.length > 0 ? (
          featured.collection?.products.edges.map((product) => (
            <div
              key={product.node.id}
              style={{
                backgroundImage: `url(${product.node.images?.edges[0]?.node.url})`,
              }}
              className={`w-[220px] h-[220px]  rounded-[15px] bg-cover bg-center flex flex-col justify-end p-5`}
            >
              <button
                className="px-[26px] py-[12px] bg-[#00000057] rounded-[4px] text-white flex justify-center"
                onClick={ () => {
                  addToCart(
                    product.node.variants.edges[0].node.id
                  );
                  
                }}
              >
                Add to cart
              </button>
              {product.node.variants.edges[0].node.id}
            </div>
          ))
        ) : (
          <div>hi</div>
        )}
      </div>
    </div>
  );
}
