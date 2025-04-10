'use server'
import { createCart, addLineItems } from "@/lib/shopify";

export async function AddToCart(productId: string) {
  const lineItems = {
    lines: [
      {
        quantity: 1,
        merchandiseId: productId, // Replace with a real variant ID from your store
      },
    ],
    buyerIdentity: {
      countryCode: "AU",
      email: "test@example.com",
    },
  };
 
    const cart = await createCart(lineItems);

    if (!cart) {
      throw new Error("Failed to create cart");
    }

    console.log("cart response:", cart);
    return {
      cartId: cart.cartCreate.cart.id,
      checkoutUrl: cart.cartCreate.cart.checkoutUrl,
    };
}

