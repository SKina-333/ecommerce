"use client";
import React from "react";
import { RemoveScroll } from "react-remove-scroll";
import { useCartContext } from "../context/CartContext";

export default function CartModal() {
  const { isCartOpen, setIsCartOpen, cartLines, checkoutUrl } =
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
              <div className="overflow-y-auto grow flex flex-col items-center ">
                <p className="text-2xl font-semibold">Your Cart</p>
                <div>
                  {cartLines.edges.map((line: any) => (
                    <div
                      key={line.node.id}
                      className="flex flex-row gap-5 py-2"
                    >
                      <div
                        style={{
                          backgroundImage: `url()`,
                        }}
                        className={`w-[100px] h-[100px]  rounded-[15px] bg-cover bg-center`}
                      ></div>
                      <div className="flex flex-col justify-center">
                        <p>{line.node.merchandise.title}</p>
                        <p>Quantity: {line.node.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-5 flex flex-row items-center ">
                <a
                  href={checkoutUrl}
                  className="grow mx-10 py-4 text-2xl font-semibold bg-black rounded-full text-center  text-white cursor-pointer"
                >
                  Checkout
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
