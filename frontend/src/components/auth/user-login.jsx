import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const userSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function UserLogin({ url, title, redirect }) {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setErrorMessage(""); // Reset error state

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error("Login failed");
        throw new Error(result.message || "Login failed");
      }

      // Store token and navigate
      localStorage.setItem("authToken", result.token);
      // After successful login
      localStorage.setItem("token", result.token);
      localStorage.setItem("role", result.role);
      toast.success("Login successfull!");
      navigate(redirect);
      toast.success("Login successfull!"); // Redirect to dashboard or any authenticated route
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg border border-gray-200">
      <CardHeader>
        <CardTitle className="text-center text-2xl text-gray-800">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="relative space-y-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-gray-700">Email</Label>
                    <Input
                      {...field}
                      type="email"
                      className="focus:ring-blue-500"
                    />
                  </FormItem>
                )}
              />
              <FormMessage>{form.formState.errors.email?.message}</FormMessage>
            </div>

            <div className="relative space-y-1">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative">
                    <Label className="text-gray-700">Password</Label>
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      className="focus:ring-blue-500"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      className="absolute right-2 top-6 text-blue-500 hover:text-blue-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </Button>
                  </FormItem>
                )}
              />
              <FormMessage>
                {form.formState.errors.password?.message}
              </FormMessage>
            </div>

            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/auth/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
