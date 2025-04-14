"use client";

import { BankCard } from "@prisma/client";
import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type BankCartContex = {
  bankcard: BankCard | undefined;
};
const BankCardContext = createContext<BankCartContex | null>(null);
export const BankCardProvider = ({ children }: { children: ReactNode }) => {
  const [bankcard, setBankCard] = useState<BankCard>();
  const getBankCard = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:4000/bankcard", {
        headers: {
          Authorization: token,
        },
      });
      setBankCard(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBankCard();
  }, []);  
  return (
    <BankCardContext.Provider value={{ bankcard }}>
      {children}
    </BankCardContext.Provider>
  );
};
export const useBank = () => {
  const context = useContext(BankCardContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
