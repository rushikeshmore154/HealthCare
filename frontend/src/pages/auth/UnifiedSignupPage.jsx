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

// User schema for patient signup
const userSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    contactNumber: z
      .string()
      .regex(/^[0-9]{10}$/, "Contact number must be 10 digits"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Hospital schema for hospital signup
const hospitalSchema = z
  .object({
    name: z.string().min(3, "Hospital name must be at least 3 characters"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    city: z.string().min(2, "City must be at least 2 characters"),
    contactNumber: z
      .string()
      .regex(/^\d{10}$/, "Contact number must be exactly 10 digits"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    totalBeds: z.preprocess(
      (val) => Number(val),
      z.number().min(1, "Must be at least 1")
    ),
    occupiedBeds: z.preprocess(
      (val) => Number(val),
      z.number().min(0, "Cannot be negative")
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.occupiedBeds <= data.totalBeds, {
    message: "Occupied beds cannot exceed total beds",
    path: ["occupiedBeds"],
  });

export default function UnifiedSignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("patient");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Patient form
  const patientForm = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      contactNumber: "",
    },
  });

  // Hospital form
  const hospitalForm = useForm({
    resolver: zodResolver(hospitalSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      contactNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      totalBeds: 0,
      occupiedBeds: 0,
    },
  });

  const onPatientSubmit = async (data) => {
    setErrorMessage("");

    try {
      await axios.post("/user/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        contactNumber: data.contactNumber,
      });

      toast.success("Registration successful! Please login.");
      navigate("/auth/login");
    } catch (error) {
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        setErrorMessage(error.message);
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  const onHospitalSubmit = async (data) => {
    setErrorMessage("");
    const availableBeds = data.totalBeds - data.occupiedBeds;

    try {
      await axios.post("/hospital/register", {
        ...data,
        availableBeds,
      });

      toast.success("Hospital registration successful! Please login.");
      navigate("/auth/login");
    } catch (error) {
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        setErrorMessage(error.message);
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl border border-gray-200">
        <CardHeader>
          <CardTitle className="text-center text-3xl text-gray-800">
            Create Account
          </CardTitle>
          <p className="text-center text-gray-600 text-sm mt-2">
            Join us and get started today
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

            {/* Patient Signup Tab */}
            <TabsContent value="patient" className="mt-0">
              <Form {...patientForm}>
                <form
                  onSubmit={patientForm.handleSubmit(onPatientSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={patientForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <Label className="text-gray-700">Full Name</Label>
                        <Input
                          {...field}
                          placeholder="Enter your full name"
                          className="focus:ring-blue-500"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={patientForm.control}
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={patientForm.control}
                    name="contactNumber"
                    render={({ field }) => (
                      <FormItem>
                        <Label className="text-gray-700">Contact Number</Label>
                        <Input
                          {...field}
                          type="tel"
                          placeholder="10-digit phone number"
                          className="focus:ring-blue-500"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={patientForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <Label className="text-gray-700">Password</Label>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            className="focus:ring-blue-500 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={patientForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <Label className="text-gray-700">Confirm Password</Label>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm password"
                            className="focus:ring-blue-500 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {errorMessage && (
                    <p className="text-red-500 text-sm">{errorMessage}</p>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                    disabled={patientForm.formState.isSubmitting}
                  >
                    {patientForm.formState.isSubmitting ? "Signing Up..." : "Sign Up as Patient"}
                  </Button>
                </form>
              </Form>
            </TabsContent>

            {/* Hospital Signup Tab */}
            <TabsContent value="hospital" className="mt-0">
              <Form {...hospitalForm}>
                <form
                  onSubmit={hospitalForm.handleSubmit(onHospitalSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={hospitalForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <Label className="text-gray-700">Hospital Name</Label>
                        <Input
                          {...field}
                          placeholder="Enter hospital name"
                          className="focus:ring-blue-500"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={hospitalForm.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <Label className="text-gray-700">City</Label>
                          <Input
                            {...field}
                            placeholder="Enter city"
                            className="focus:ring-blue-500"
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={hospitalForm.control}
                      name="contactNumber"
                      render={({ field }) => (
                        <FormItem>
                          <Label className="text-gray-700">Contact Number</Label>
                          <Input
                            {...field}
                            type="tel"
                            placeholder="10-digit number"
                            className="focus:ring-blue-500"
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={hospitalForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <Label className="text-gray-700">Address</Label>
                        <Input
                          {...field}
                          placeholder="Enter full address"
                          className="focus:ring-blue-500"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={hospitalForm.control}
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={hospitalForm.control}
                      name="totalBeds"
                      render={({ field }) => (
                        <FormItem>
                          <Label className="text-gray-700">Total Beds</Label>
                          <Input
                            {...field}
                            type="number"
                            min={1}
                            placeholder="Total beds"
                            className="focus:ring-blue-500"
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={hospitalForm.control}
                      name="occupiedBeds"
                      render={({ field }) => (
                        <FormItem>
                          <Label className="text-gray-700">Occupied Beds</Label>
                          <Input
                            {...field}
                            type="number"
                            min={0}
                            placeholder="Occupied beds"
                            className="focus:ring-blue-500"
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={hospitalForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <Label className="text-gray-700">Password</Label>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            className="focus:ring-blue-500 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={hospitalForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <Label className="text-gray-700">Confirm Password</Label>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm password"
                            className="focus:ring-blue-500 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {errorMessage && (
                    <p className="text-red-500 text-sm">{errorMessage}</p>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                    disabled={hospitalForm.formState.isSubmitting}
                  >
                    {hospitalForm.formState.isSubmitting ? "Registering..." : "Register Hospital"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <Link to="/auth/login" className="text-indigo-600 hover:text-indigo-700 font-medium">
                Sign In
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
