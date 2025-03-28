import React from "react";

export default function HomeCatalogue() {
  return (
    <div className="border border-[#CDCDCD] rounded-[10px] p-[30px] mt-3 ">
      <div className="p-[45px] text-wrap bg-[#313131] text-white w-[350px] rounded-[15px] flex flex-col gap-[220px]">
        <p className="text-[36px]">
          <span className="font-semibold">Shop beauty</span> products
        </p>
        <div className="flex flex-col text-[30px] font-thin">
          <a href="">Hair care</a>
          <a href="">Body</a>
          <a href="">Nail</a>
          <a href="">Facial</a>
        </div>
      </div>
    </div>
  );
}
