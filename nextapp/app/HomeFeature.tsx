import React, { Suspense } from "react";
import { getCollection } from "@/lib/shopify";
import HomeFeatureResult from "../components/view/HomeFeatureResult";

export default function HomeFeature() {
  const collectionResult = getCollection("featured");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeFeatureResult collectionResult={collectionResult} />
    </Suspense>
  );
}




