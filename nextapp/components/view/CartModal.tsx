"use client";
import React from "react";
import { RemoveScroll } from "react-remove-scroll";
import { useCartContext } from "../context/CartContext";

export default function CartModal() {
  const { isCartOpen, setIsCartOpen, cartLines, checkoutUrl, cartObject } =
    useCartContext();
  return (
    <RemoveScroll
      enabled={isCartOpen}
      removeScrollBar={true}
      forwardProps={true}
    >
      <div
        className={`${
          isCartOpen ? "" : "hidden"
        } z-50 fixed top-0 left-0 w-full h-full bg-black/50 flex flex-row items-end`}
      >
        <div
          className="w-full h-full bg-transparent"
          onClick={() => {
            setIsCartOpen(false);
          }}
        ></div>
        <div className="h-full min-w-[450px] max-w-[450px] bg-white flex flex-col">
          <div className=" w-full py-6 px-5 flex flex-row justify-end">
            <button
              onClick={() => {
                setIsCartOpen(false);
              }}
              className="underline cursor-pointer hover:font-semibold"
            >
              close
            </button>
          </div>
          {cartLines && cartLines.edges.length > 0 ? (
            <>
              <div className="overflow-y-auto grow flex flex-col items-center gap-5">
                <p className="text-2xl font-semibold">Your Cart</p>
                <div className="w-full flex flex-col px-5 gap-1 ">
                  {cartLines.edges.map((line: any) => (
                    <div
                      key={line.node.id}
                      className="flex flex-row gap-5 py-2 px-5 border-t-2 border-gray-100"
                    >
                      <div
                        style={{
                          backgroundImage: `url(${line.node.merchandise.image.url})`,
                        }}
                        className={`w-[100px] h-[110px]  rounded-[15px] bg-cover bg-center border border-gray-200`}
                      ></div>
                      <div className="flex flex-row justify-between grow">
                        <div className="flex flex-col">
                          <p>${parseInt(line.node.merchandise.price.amount)}</p>
                          <p className="font-semibold">{line.node.merchandise.product.title}</p>
                        </div>
                        <div className="flex flex-col justify-end">
                          <p className="text-sm">Quantity {line.node.quantity}</p>
                        </div>
                       
                      </div>
                    </div>
                  ))}
                  <div className="flex flex-col mt-5">
                    <p className="font-semibold text-2xl">Summary</p>
                    <div className="flex flex-row justify-between ">
                      <p  className="">total</p>
                      <p>${cartObject.cost.totalAmount.amount}</p>
                      
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-5 flex flex-row items-center ">
                <a
                  href={checkoutUrl}
                  className="grow mx-10 py-4 text-lg font-semibold bg-black rounded-full text-center  text-white cursor-pointer"
                >
                  GO TO CHECKOUT
                </a>
              </div>
            </>
          ) : (
            <div className="overflow-y-auto grow flex flex-col items-center ">
              <p className="text-2xl font-semibold">Your Cart is Empty</p>
            </div>
          )}
        </div>
      </div>
    </RemoveScroll>
  );
}
