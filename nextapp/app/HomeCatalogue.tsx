import React, { Suspense } from "react";
import { getAllCollections } from "@/lib/shopify";
import HomeCatalogueResult from "../components/view/HomeCatalogueResult";

export default function HomeCatalogue() {
  const collectionResult = getAllCollections();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeCatalogueResult collectionResult={collectionResult} />
    </Suspense>
  );
}
