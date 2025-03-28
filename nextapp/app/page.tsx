import { Montserrat } from "next/font/google";
import {getAllProducts} from "@/lib/shopify";

import HomeCatalogue from "./HomeCatalogue";
import HomeFeature from "./HomeFeature";
const montserrat = Montserrat({
  weight: "300",
  subsets: ["latin"],
});



export default async function Home() {
  // const products = await getAllProducts();

  // // Log products to server console
  // console.log('Fetched products:', JSON.stringify(products, null, 2));
  return (
    <div className={`${montserrat.className} flex flex-col gap-[30px]`}>
      <HomeCatalogue />
      <HomeFeature />
    </div>
  );
}
