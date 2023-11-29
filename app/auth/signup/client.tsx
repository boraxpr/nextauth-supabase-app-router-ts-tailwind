"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ServerActionResult } from "@/types/server";
import { handleFormServerActionError } from "@/utils/client/actions";
import { useRouter } from "next/navigation";
import { SignUpSchema } from "@/server/schemas/auth";

interface Props {
  signUpFn: (data: SignUpSchema) => Promise<ServerActionResult>;
}

export default function SignUpClient(props: Props) {
  const router = useRouter();
  const form = useForm<SignUpSchema>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const mutation = useMutation({
    mutationFn: props.signUpFn,
    onSuccess(data, variables, context) {
      if (data.status === "success") router.push("/auth/signin");
      else handleFormServerActionError(data, form);
    },
  });
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <Card className="w-full max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))}>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Sign up for a new account to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="yourname@example.com" />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="********"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="********"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="space-x-2">
              <Button loading={mutation.isPending}>Sign Up</Button>
              <Link
                href="/auth/signin"
                className={buttonVariants({ variant: "outline" })}
              >
                Sign In
              </Link>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
