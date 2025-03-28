'use server'

import React from "react";
import { getCollection } from "@/lib/shopify";
import Link from "next/link";


export default async function HomeFeature() {
  const Featured = await getCollection("featured");
  // Log products to server console
  console.log("Fetched products:", JSON.stringify(Featured, null, 2));

  console.log(Featured.collection?.products.edges[0].node.images.edges[0].node.url);
  return (
    <div className="px-[27px] py-[20px] border border-[#CDCDCD] rounded-[10px] flex flex-col gap-5">
      <p className="font-semibold text-[40px]">Feature</p>

      <div className="flex flex-row gap-5">
        {Featured &&  Featured.collection?.products.edges.length > 0 ? (
          Featured.collection?.products.edges.map((product) => (
            <div key={product.node.id} style={{ backgroundImage: `url(${product.node.images?.edges[0]?.node.url})` }} className={`w-[220px] h-[220px]  rounded-[15px] bg-cover bg-center flex flex-col justify-end p-5`}>
              <Link className="px-[26px] py-[12px] bg-[#00000057] rounded-[4px] text-white flex justify-center" href="/featured">Add to card</Link> 
            </div>
          ))
        ) : (
          <div>hi</div>
        )}
      </div>
    </div>
  );
}
