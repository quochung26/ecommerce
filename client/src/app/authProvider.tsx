import { cookies } from "next/headers";
import { jwtVerify, type JWTPayload } from "jose";
import { CustomerDataType } from '@/types/customer'
import AuthClientProvider from "@/app/authClientProvider";

interface CustomerJWTPayload extends JWTPayload {
  customerData: CustomerDataType
}

export default async function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const customerTokenData = cookieStore.get("customerDataToken")?.value;
  const customerToken = cookieStore.get("customerToken")?.value || null
  let customerData: CustomerDataType = {
    isLogin: false,
    customer: null
  };
  if (customerTokenData) {
    const { payload }: { payload: CustomerJWTPayload } = await jwtVerify(
      customerTokenData,
      new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
    );
    customerData = payload["customerData"];
  }

  return (
    <AuthClientProvider customerData={customerData} customerToken={customerToken}>
      {children}
    </AuthClientProvider>
  );
}
