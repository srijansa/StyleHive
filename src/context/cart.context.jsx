import { createContext, useState, useEffect } from 'react';

export const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const deleteCartItem = (cartItems, productToDelete) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToDelete.id);
    if (existingCartItem.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id != productToDelete.id);
    }
    return cartItems.map((cartItem) =>
        cartItem.id === productToDelete.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  deleteItemFromCart: () => {},
  cartCount: 0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

    useEffect(()=> {
        const newCartCount = cartItems.reduce((total, cartItems) => total + cartItems.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems])

  const addItemToCart = (product) =>
    setCartItems(addCartItem(cartItems, product));

  const deleteItemFromCart = (product) => setCartItems(deleteCartItem(cartItems, product));

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, deleteItemFromCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};