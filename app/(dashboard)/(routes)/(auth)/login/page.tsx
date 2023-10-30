"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.string().min(1, {
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

const LoginPage = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/", values);

    } catch {
      toast.error("Something went wrong");
    }
  }
  
  return (  
    <div className="w-full flex flex-col gap-5 items-center justify-center h-full -mt-12 p-6 lg:-m-20">
      <div>
        <h1 className="text-3xl font-bold text-center text-primary">
          Login
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8 w-full"
          >
            <FormField 
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full h-12 text-md" 
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full h-12 text-md md:w-96"  
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="">
              <Button
                size="xl"
                type="submit"
                disabled={!isValid || isSubmitting }
                className="w-full"
              >
                Continue
              </Button>
            </div>
          </form>
        </Form>

        <div className="flex flex-col gap-4 mt-5 w-full">
          <hr />
          <div className="text-neutral-500 text-center font-light">
            <p>First time using Internify?&nbsp; 
            <span 
                onClick={() => router.push("/register")} 
                className="text-neutral-800 cursor-pointer hover:underline"
              >
                Create an account
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default LoginPage;