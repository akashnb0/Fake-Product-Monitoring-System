// actions.js

// Action Types
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCREMENT_CART_ITEM = 'INCREMENT_CART_ITEM';
export const DECREMENT_CART_ITEM = 'DECREMENT_CART_ITEM';

// Action Creators
export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const removeFromCart = (itemId) => ({
  type: REMOVE_FROM_CART,
  payload: itemId,
});

export const incrementCartItem = (itemId) => ({
  type: INCREMENT_CART_ITEM,
  payload: itemId,
});

export const decrementCartItem = (itemId) => ({
  type: DECREMENT_CART_ITEM,
  payload: itemId,
});
