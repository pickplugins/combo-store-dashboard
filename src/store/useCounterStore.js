// src/store/useCounterStore.js
import { create } from 'zustand'

export const useCounterStore = create((set) => ({


  cartItems: [],
  notifications: [],
  userDataX: null,

  addNotification: (newNotification) =>
    set((state) => ({
      notifications: [...state.notifications, newNotification],
    })),

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((todo) => todo.id !== id),
    })),
  resetNotification: (id) =>
    set((state) => ({
      notifications: [],
    })),
  updateNotification: (id, updatedFields) => set((state) => ({
    notifications: state.notifications.map((todo) =>
      todo.id === id ? { ...todo, ...updatedFields } : todo
    ),
  })),

  //cartItems
  // addCartItems: (newCartItems) =>
  //   set((state) => ({
  //     cartItems: [...state.cartItems, newCartItems],
  //   })),
  addCartItems: (newCartItem) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === newCartItem.id
      );

      if (existingItem) {
        // update quantity of existing product
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === newCartItem.id
              ? { ...item, quantity: item.quantity + newCartItem.quantity }
              : item
          ),
        };
      } else {
        // add new product to cart
        return {
          cartItems: [...state.cartItems, newCartItem],
        };
      }
    }),
  removeCartItems: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((todo) => todo.id !== id),
    })),
  resetCartItems: (id) =>
    set((state) => ({
      cartItems: [],
    })),
  updateCartItems: (id, updatedFields) => set((state) => ({
    cartItems: state.cartItems.map((todo) =>
      todo.id === id ? { ...todo, ...updatedFields } : todo
    ),
  })),







  // ✅ Add these for userDataX
  setUserDataX: (data) => set(() => ({ userDataX: data })),
  resetUserDataX: () => set(() => ({ userDataX: null })),
  updateUserDataX: (partialData) =>
    set((state) => ({
      userData: { ...state.userData, ...partialData },
    })),
}))
