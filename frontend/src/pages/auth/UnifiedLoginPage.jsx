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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "@/services/axios";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function UnifiedLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("patient");
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const loginConfig = {
      patient: {
        url: "/user/login",
        redirect: "/home",
        role: "user",
      },
      hospital: {
        url: "/hospital/login",
        redirect: "/hospital/dashboard",
        role: "hospital",
      },
    };

    const config = loginConfig[activeTab];

    try {
      const response = await axios.post(config.url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = response.data;

      localStorage.setItem("authToken", result.token);
      localStorage.setItem("token", result.token);
      localStorage.setItem("role", result.role || config.role);
      
      toast.success("Login successful!");
      navigate(config.redirect);
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border border-gray-200">
        <CardHeader>
          <CardTitle className="text-center text-3xl text-gray-800">
            Welcome Back
          </CardTitle>
          <p className="text-center text-gray-600 text-sm mt-2">
            Sign in to your account
          </p>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="patient" className="text-base">
                Patient
              </TabsTrigger>
              <TabsTrigger value="hospital" className="text-base">
                Hospital
              </TabsTrigger>
            </TabsList>

            <TabsContent value="patient" className="mt-0">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="space-y-1">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <Label className="text-gray-700">Email</Label>
                          <Input
                            {...field}
                            type="email"
                            placeholder="Enter your email"
                            className="focus:ring-blue-500"
                          />
                        </FormItem>
                      )}
                    />
                    <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                  </div>

                  <div className="space-y-1">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <Label className="text-gray-700">Password</Label>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              className="focus:ring-blue-500 pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                  </div>

                  <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                    Sign In as Patient
                  </Button>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="hospital" className="mt-0">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="space-y-1">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <Label className="text-gray-700">Email</Label>
                          <Input
                            {...field}
                            type="email"
                            placeholder="Enter hospital email"
                            className="focus:ring-blue-500"
                          />
                        </FormItem>
                      )}
                    />
                    <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                  </div>

                  <div className="space-y-1">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <Label className="text-gray-700">Password</Label>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              className="focus:ring-blue-500 pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                  </div>

                  <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                    Sign In as Hospital
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link to="/auth/signup" className="text-indigo-600 hover:text-indigo-700 font-medium">
                Sign Up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
