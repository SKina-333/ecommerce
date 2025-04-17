"use client";

import { animate, stagger } from "motion";

import React, { useState, use, useRef, useEffect } from "react";
import { Spotlight } from "@/components/motion-primitives/spotlight";

export default function HomeCatalogueResult({
  collectionResult,
}: {
  collectionResult: Promise<any>;
}) {
  const [selectedCategory, setSelectedCategory] = useState("Hair care");

  const collections = use(collectionResult);

  const filteredCollections = collections.collections.edges.filter(
    (collection) => collection.node.title === selectedCategory
  );

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.fonts.ready.then(() => {
      if (!containerRef.current) return;

      // Hide the container until the fonts are loaded
      containerRef.current.style.visibility = "visible";

      // Animate the words in the h1
      animate(
        containerRef.current.querySelectorAll("#container"),
        { opacity: [0, 1], y: [10, 0] },
        {
          type: "spring",
          duration: 2,
          bounce: 0,
          delay: stagger(0.2),
        }
      );
    });
  }, [selectedCategory]);
  return (
    <div className="border border-[#CDCDCD] rounded-[10px] p-[30px] mt-3 flex flex-row gap-5">
      <div className="p-[45px] min-w-[350px] max-w-[350px] grow text-wrap bg-[#313131] text-white rounded-[15px] flex flex-col gap-[220px] ">
        <p className="text-[36px] w-full">
          <span className="font-semibold">Shop beauty</span> products
        </p>
        <div className="flex flex-col text-[30px] font-thin items-baseline">
          {["Hair care", "Body", "Nail", "Facial"].map((category) => (
            <button
              key={category}
              className={`cursor-pointer  ${
                selectedCategory === category ? "font-bold underline" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div
        ref={containerRef}
        className="flex flex-row  overflow-x-scroll scrollbar-hide shrink gap-5 "
      >
        {filteredCollections[0].node.products.edges.map((product) => (
          <div key={product.node.id} className="flex flex-col justify-between ">
            <div
              id="container"
              className={`min-w-[350px] rounded-[15px]  flex flex-col justify-between gap-3`}
            >
              <div
                style={{
                  backgroundImage: `url(${product.node.images?.edges[0]?.node.url})`,
                }}
                className="w-full min-h-[440px] bg-cover bg-center border border-gray-200 rounded-[15px]"
              ></div>
              <div className="font-bold">{product.node.title}</div>
              <div className="font-bold">
                ${parseInt(product.node.variants.edges[0].node.price.amount)}
              </div>
              <div className="relative flex flex-col overflow-hidden p-[1px] rounded-[15px] bg-gray-100">
                <Spotlight
                  className="bg-[#F25C5C] blur-2xl"
                  size={124}
                  springOptions={{
                    bounce: 0.3,
                    duration: 0.1,
                  }}
                />
                <button className="relative bg-[#f0f0f0]  text-black font-bold p-5 rounded-[15px] cursor-pointer">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
