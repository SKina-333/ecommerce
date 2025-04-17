'use client'
import { createContext, useContext, useState, useEffect } from "react";
import { createCart, getCart, addLineItems, updateCart } from "@/lib/shopify";


const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartId, setCartId] = useState<string | null>(null);
    const [cartLines, setCartLines] = useState<any>(null);
    const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartObject, setCartObject] = useState<any>(null);

    const checkUserCart = () =>{
        const id = localStorage.getItem("cartId");
        if (id) {
            return true
        } else {
            return false
        }
    }

    const getCartObject = async (cartId: string) => {
        const res = await getCart(cartId);
        if (res) {
            console.log("cart response:", res.cart);
            setCartObject(res.cart);
            setCartLines(res.cart.lines);
            setCheckoutUrl(res.cart.checkoutUrl);
        }
    }

    const updateCartLines = async (cartId: string) => {
        const res = await getCart(cartId);
        if (res) {
            console.log("cart response:", res.cart.lines);
            setCartLines(res.cart.lines);
        }
    }
    
    const addToCart = async (productId: string) => {
        
        if(checkUserCart()){
            //case: user add a new line
            const lineExists = (cart: any, lineId: string): boolean => {
                return cart.lines.edges.some((edge) => edge.node.merchandise.id === lineId);
            };
           if(lineExists(cartObject, productId)){
                const lineItem = cartObject.lines.edges.find((edge: any) => edge.node.merchandise.id === productId);
                const updateItem = {
                    id: lineItem.node.id,
                    merchandiseId: productId,
                    quantity: lineItem.node.quantity + 1,
                }


                const updateCartItem = await updateCart(cartId!, updateItem);

                if (updateCartItem) {
                    console.log("cart response:", updateCartItem);
                    updateCartLines(cartId!);
                    setIsCartOpen(true);
                    getCartObject(cartId!);
                }
           }else{
                const lineItem =  [
                      {
                        quantity: 1,
                        merchandiseId: productId, 
                      },
                    ];
                const addNewCartItem = await addLineItems(cartId!, lineItem);
                if (addNewCartItem) {
                    console.log("cart response:", addNewCartItem);
                    updateCartLines(cartId!);
                    setIsCartOpen(true);
                    getCartObject(cartId!);
                }
           }

            
        }else{
            const lineItems = {
                lines: [
                  {
                    quantity: 1,
                    merchandiseId: productId, // Replace with a real variant ID from your store
                  },
                ],
                
            };
            const cart = await createCart(lineItems);
            if (cart) {
                setCartId(cart.cartCreate.cart.id);
                setCheckoutUrl(cart.cartCreate.cart.checkoutUrl);
                updateCartLines(cartId!);
                getCartObject(cart.cartCreate.cart.id);
                localStorage.setItem("cartId", cart.cartCreate.cart.id);
                setIsCartOpen(true);
            }
        }
        
    };
    useEffect(()=>{
        if (checkUserCart()){
            const id = localStorage.getItem("cartId");
            if (id) {
                setCartId(id);
                getCartObject(id);
            }
        }
        
    },[]);
    return (
        <CartContext.Provider value={{ cartId, isCartOpen, setIsCartOpen, addToCart, cartLines, checkoutUrl, cartObject }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCartContext = () => {
    return useContext(CartContext);
}