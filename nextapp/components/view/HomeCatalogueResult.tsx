"use client";

import { animate, stagger } from "motion"

import React, { useState, use, useRef, useEffect } from "react";

export default function HomeCatalogueResult({
  collectionResult,
}: {
  collectionResult: Promise<any>;
}) {
  const [selectedCategory, setSelectedCategory] = useState("Hair care");

  const collections = use(collectionResult);

  const filteredCollections = collections.collections.edges.filter((collection)=> collection.node.title === selectedCategory);
  

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.fonts.ready.then(() => {
        if (!containerRef.current) return

        // Hide the container until the fonts are loaded
        containerRef.current.style.visibility = "visible"

        
        

        // Animate the words in the h1
        animate(
            containerRef.current.querySelectorAll('div'),
            { opacity: [0, 1], y: [10, 0] },
            {
                type: "spring",
                duration: 2,
                bounce: 0,
                delay: stagger(0.2),
            }
        )
    })
}, [selectedCategory])
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
      <div ref={containerRef} className="flex flex-row border border-black overflow-x-scroll scrollbar-hide shrink gap-5 ">
        {filteredCollections[0].node.products.edges.map((product)=>(
          <div key={product.node.id} style={{ backgroundImage: `url(${product.node.images?.edges[0]?.node.url})` }} className={`min-w-[350px] border border-black rounded-[15px] bg-cover bg-center `}>
            
          </div>
        ))}
      </div>
    </div>
  );
}
