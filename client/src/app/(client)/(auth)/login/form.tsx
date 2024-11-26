"use client";

import { LoginSchema, LoginType } from "@/lib/validations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requestLogin, setCustomerToken } from "@/requests/api/auth";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { setCustomer, setToken } from "@/lib/slides/customer";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginType) {
    try {
      const result = await requestLogin(values);

      const { data, customer_token } = result;

      await setCustomerToken({ token: customer_token, customerData: { isLogin: true, ...data} });

      dispatch(setToken(customer_token));

      dispatch(setCustomer(data));

      toast({
        title: "Success",
        description: result.message,
        variant: "success",
        duration: 3000,
      });

      router.push("/customer");
    } catch (e: any) {
      toast({
        title: "Error",
        description: e.message,
        variant: "destructive",
        duration: 3000,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 pt-0">
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Password <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/register" className="underline">
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
}
