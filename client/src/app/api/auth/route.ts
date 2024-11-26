import { cookies } from "next/headers";
import { SignJWT } from "jose";

export async function POST(request: Request) {
  const body = await request.json();
  const customerToken = body.token as string;
  const customerData = body.customerData;
  if (!customerToken) {
    return Response.json(
      { message: "Customer token not found" },
      {
        status: 400,
      }
    );
  }
  const expiresDate = new Date().setFullYear(new Date().getFullYear() + 1);

  cookies().set("customerToken", customerToken, {
    secure: false,
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    expires: expiresDate,
  }); 

  const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET;
  
  const customerDataToken = await new SignJWT({
    customerData,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1y")
    .sign(new TextEncoder().encode(jwtSecret));

  cookies().set("customerDataToken", customerDataToken, {
    secure: false,
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    expires: expiresDate,
  });

  return Response.json(
    { message: "Set token successfully" },
    {
      status: 200,
    }
  );
}
