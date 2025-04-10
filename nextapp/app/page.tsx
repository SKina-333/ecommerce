'use client'
import { Montserrat } from "next/font/google";


import HomeCatalogue from "./HomeCatalogue";
import HomeFeature from "./HomeFeature";


const montserrat = Montserrat({
  weight: "300",
  subsets: ["latin"],
});



export default function Home() {

  return (
    <div className={`${montserrat.className} flex flex-col gap-[30px]`}>
      <HomeCatalogue />
      <HomeFeature />
    </div>
  );
}
