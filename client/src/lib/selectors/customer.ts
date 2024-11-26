import type {  RootState } from "@/lib/store";

export const customerSelector = (state: RootState) => state.customer.isLogin;