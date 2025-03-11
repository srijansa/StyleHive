import { createContext, useState, useEffect, useReducer } from 'react';

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
        return cartItems.filter(cartItem => cartItem.id !== productToDelete.id);
    }
    return cartItems.map((cartItem) =>
        cartItem.id === productToDelete.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
};

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
  
export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  deleteItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0
});

// Reducers have only readable values 
const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0
}

const CART_ACTION_ITEMS = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const cartReducer = (state, action) =>{
  const {type, payload} = action;
  switch (type){
    case CART_ACTION_ITEMS.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      };
    case CART_ACTION_ITEMS.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default: throw new Error(`unhandled type of ${type} in cartReducer`);
  }
}

export const CartProvider = ({ children }) => {
  // const [isCartOpen, setIsCartOpen] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  // const [cartCount, setCartCount] = useState(0);
  // const [cartTotal, setCartTotal] = useState(0);

  //   useEffect(()=> {
  //       const newCartCount = cartItems.reduce((total, cartItems) => total + cartItems.quantity, 0);
  //       setCartCount(newCartCount);
  //   }, [cartItems])
  //   useEffect(() => {
  //       const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price,0);
  //       setCartTotal(newCartTotal);
  //     }, [cartItems]);
  const [{isCartOpen, cartItems, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) =>{
    const newCartCount = newCartItems.reduce((total, cartItems) => total + cartItems.quantity, 0);
        // setCartCount(newCartCount);

    const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price,0);
    // setCartTotal(newCartTotal);

    dispatch({ type: CART_ACTION_ITEMS.SET_CART_ITEMS, payload: {cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount}});
    // generate newCartTotal
    // generate newCartCount
    // dispatch new action with payload = {
    //   newCartItems,
    //   newCartTotal, 
    //   newCartCount 
    // }
  }
  const addItemToCart = (product) =>{
    // setCartItems(addCartItem(cartItems, product));
    const newCartItems = addCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  };
  const deleteItemFromCart = (product) => {
    // setCartItems(deleteCartItem(cartItems, product));
    const newCartItems = deleteCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  };
  const clearItemFromCart = (cartItemToClear) => {
    // setCartItems(clearCartItem(cartItems, cartItemToClear));
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  };
  const setIsCartOpen = (bool) => {
    dispatch({type: CART_ACTION_ITEMS.SET_IS_CART_OPEN, payload: bool});
  }
  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, deleteItemFromCart, clearItemFromCart, cartTotal};

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};