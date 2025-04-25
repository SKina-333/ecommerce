import React, { Suspense } from "react";
import { getAllProducts } from "@/lib/shopify";
import ProductsResult from "./ProductsResult";

export default function ProductsPage() {
  const productResult = getAllProducts();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsResult productsResult={productResult} />
    </Suspense>
  );
}
