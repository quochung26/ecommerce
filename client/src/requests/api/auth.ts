import { request } from "@/requests/request";
import { RegisterType, LoginType } from "@/lib/validations/auth.schema";
import { serverRequest } from "@/requests/serverRequest";
import { CustomerDataType } from "@/types/customer";

export const requestRegister = (body: RegisterType) => {
  return request("/customer/register", "POST", body);
};

export const requestLogin = (body: LoginType) => {
  return request("/customer/login", "POST", body);
};

export const getCurrentCustomer = () => {
  return serverRequest("/customer/current");
};

export const setCustomerToken = (body: { token: string, customerData: CustomerDataType }) => {
  return request(`/api/auth`, "POST", body);
};
