import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import axios from "@/services/axios";

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

export default function HospitalSignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const form = useForm({
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

  const onSubmit = async (data) => {
    setErrorMessage("");
    const availableBeds = data.totalBeds - data.occupiedBeds;

    try {
      const res = await axios.post("/hospital/register", {
        ...data,
        availableBeds,
      });

      navigate("/auth/login");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage(err.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-2xl shadow-xl border border-gray-200">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-gray-800">
            Register Your Hospital
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {[
                { name: "name", label: "Hospital Name" },
                { name: "address", label: "Address" },
                { name: "city", label: "City" },
                { name: "contactNumber", label: "Contact Number", type: "tel" },
                { name: "email", label: "Email", type: "email" },
              ].map(({ name, label, type = "text" }) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name}
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-gray-700">{label}</Label>
                      <Input {...field} type={type} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative">
                    <Label className="text-gray-700">Password</Label>
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      className="absolute right-2 top-6"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="relative">
                    <Label className="text-gray-700">Confirm Password</Label>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      className="absolute right-2 top-6"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="totalBeds"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-gray-700">Total Beds</Label>
                      <Input {...field} type="number" min={1} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="occupiedBeds"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-gray-700">Occupied Beds</Label>
                      <Input {...field} type="number" min={0} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Registering..." : "Register"}
              </Button>
            </form>
          </Form>

          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
