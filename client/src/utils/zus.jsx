// store.js
import create from "zustand";

const useStore = create((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (status) => set({ isLoggedIn: status }),
}));

export default useStore;
