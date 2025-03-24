import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LogIn, School } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

type FormValues = z.infer<typeof formSchema>;

interface LoginFormProps {
  onSuccess?: () => void;
  className?: string;
}

const LoginForm = ({ onSuccess, className }: LoginFormProps = {}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "smp01laki@gmail.com",
      password: "P4$$word",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setError(null);
    try {
      // For demo purposes, hardcoded credentials check
      if (data.email === "smp01laki@gmail.com" && data.password === "P4$word") {
        // Simulate successful login
        await signIn(data.email, data.password);
        if (onSuccess) {
          onSuccess();
        } else {
          const from = location.state?.from?.pathname || "/dashboard";
          navigate(from, { replace: true });
        }
        return;
      }

      // Try regular Supabase auth if not using demo credentials
      await signIn(data.email, data.password);
      if (onSuccess) {
        onSuccess();
      } else {
        const from = location.state?.from?.pathname || "/dashboard";
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Email atau password salah");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className={cn("w-[450px] shadow-xl border-0", className)}>
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <div className="bg-primary text-white p-4 rounded-full shadow-lg">
            <School className="h-8 w-8" />
          </div>
        </div>
        <CardHeader className="space-y-1 pt-10">
          <CardTitle className="text-2xl font-bold text-center text-primary">
            Aplikasi Pendataan Sekolah
          </CardTitle>
          <CardDescription className="text-center">
            Masukkan email dan password untuk mengakses sistem
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm border border-red-200">
              {error}
            </div>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="nama@sekolah.edu"
                        {...field}
                        type="email"
                        className="border-gray-300 focus:border-primary focus:ring-primary"
                      />
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
                    <FormLabel className="text-gray-700">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Password"
                          {...field}
                          type={showPassword ? "text" : "password"}
                          className="border-gray-300 focus:border-primary focus:ring-primary"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-gray-700"
                          onClick={toggleShowPassword}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white mt-6"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></span>
                    Memproses...
                  </span>
                ) : (
                  <span className="flex items-center gap-2 justify-center">
                    <LogIn className="h-4 w-4" />
                    Login
                  </span>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 border-t pt-4">
          <Button
            variant="link"
            className="text-sm text-primary"
            onClick={() => alert("Fitur lupa password belum tersedia")}
          >
            Lupa password?
          </Button>
          <p className="text-xs text-center text-gray-500 mt-4">
            © {new Date().getFullYear()} SMP Negeri 1 Jakarta | Aplikasi
            Pendataan Sekolah v1.0
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginForm;
