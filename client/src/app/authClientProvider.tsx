"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { CustomerDataType } from "@/types/customer";
import { setCustomer, setToken, setSignOut } from "@/lib/slides/customer";

export default function AuthClientProvider({
  children,
  customerData,
  customerToken,
}: Readonly<{
  children: React.ReactNode;
  customerData: CustomerDataType;
  customerToken: string | null;
}>) {
  const currentCustomer = useAppSelector((state) => state.customer);
  const dispatch = useAppDispatch();
  const { isLogin: currentIsLogin } = currentCustomer;
  const { isLogin, customer } = customerData;

  console.log(customerData)

  useEffect(() => {
    if (!isLogin || !customerToken) {
      setSignOut();
    } else if (!currentIsLogin && isLogin) {
      dispatch(setCustomer(customer));
      dispatch(setToken(customerToken));
    }
  }, [currentIsLogin, isLogin, customer, customerToken, dispatch]);

  return children;
}
