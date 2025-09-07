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

export default function UserSignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            contactNumber: "",
        },
    });

    const onSubmit = async (data) => {
        setErrorMessage(""); // Reset error state

        try {
            const response = await fetch("http://localhost:5000/api/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    contactNumber: data.contactNumber,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Sign-up failed");
            }

            navigate("/auth/login"); // Redirect after successful signup
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <Card className="w-full max-w-md shadow-lg border border-gray-200">
            <CardHeader>
                <CardTitle className="text-center text-2xl text-gray-800">
                    Create an Account
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        <div className="relative space-y-1">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label className="text-gray-700">
                                            Full Name
                                        </Label>
                                        <Input
                                            {...field}
                                            className="focus:ring-blue-500"
                                        />
                                    </FormItem>
                                )}
                            />
                            <FormMessage>
                                {form.formState.errors.name?.message}
                            </FormMessage>
                        </div>

                        <div className="relative space-y-1">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label className="text-gray-700">
                                            Email
                                        </Label>
                                        <Input
                                            {...field}
                                            type="email"
                                            className="focus:ring-blue-500"
                                        />
                                    </FormItem>
                                )}
                            />
                            <FormMessage>
                                {form.formState.errors.email?.message}
                            </FormMessage>
                        </div>

                        <div className="relative space-y-1">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="relative">
                                        <Label className="text-gray-700">
                                            Password
                                        </Label>
                                        <Input
                                            {...field}
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            className="focus:ring-blue-500"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            className="absolute right-2 top-6 text-blue-500 hover:text-blue-600"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        >
                                            {showPassword ? (
                                                <EyeOff size={18} />
                                            ) : (
                                                <Eye size={18} />
                                            )}
                                        </Button>
                                    </FormItem>
                                )}
                            />
                            <FormMessage>
                                {form.formState.errors.password?.message}
                            </FormMessage>
                        </div>

                        <div className="relative space-y-1">
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem className="relative">
                                        <Label className="text-gray-700">
                                            Confirm Password
                                        </Label>
                                        <Input
                                            {...field}
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            className="focus:ring-blue-500"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            className="absolute right-2 top-6 text-blue-500 hover:text-blue-600"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff size={18} />
                                            ) : (
                                                <Eye size={18} />
                                            )}
                                        </Button>
                                    </FormItem>
                                )}
                            />
                            <FormMessage>
                                {form.formState.errors.confirmPassword?.message}
                            </FormMessage>
                        </div>

                        <div className="relative space-y-1">
                            <FormField
                                control={form.control}
                                name="contactNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label className="text-gray-700">
                                            Contact Number
                                        </Label>
                                        <Input
                                            {...field}
                                            type="tel"
                                            className="focus:ring-blue-500"
                                        />
                                    </FormItem>
                                )}
                            />
                            <FormMessage>
                                {form.formState.errors.contactNumber?.message}
                            </FormMessage>
                        </div>

                        {errorMessage && (
                            <p className="text-red-500 text-sm">
                                {errorMessage}
                            </p>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting
                                ? "Signing Up..."
                                : "Sign Up"}
                        </Button>
                    </form>
                </Form>

                <p className="mt-4 text-center text-gray-600">
                    Already have an account?{" "}
                    <Link
                        to="/auth/login"
                        className="text-blue-500 hover:underline"
                    >
                        Login here
                    </Link>
                </p>
            </CardContent>
        </Card>
    );
}
