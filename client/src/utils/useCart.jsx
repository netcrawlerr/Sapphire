import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [singleItem, setSingleItem] = useState([]);

  return (
    <CartContext.Provider value={{ singleItem, setSingleItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
