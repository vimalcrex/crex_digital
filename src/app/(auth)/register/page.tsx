"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
      companyName: formData.get("companyName") as string,
      phone: formData.get("phone") as string,
    };

    // Validation
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (data.password.length < 8) {
      setError("Password must be at least 8 characters");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Registration failed");
        setIsLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/login?registered=true");
      }, 2000);
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  }

  if (success) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Registration Submitted!
            </h2>
            <p className="mt-2 text-gray-600">
              Our team will review your application and contact you shortly.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Get Started</CardTitle>
        <CardDescription className="text-center">
          Create your CREX Digital account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Full Name"
              type="text"
              name="name"
              placeholder="John Smith"
              required
              disabled={isLoading}
            />

            <Input
              label="Phone"
              type="tel"
              name="phone"
              placeholder="(555) 123-4567"
              disabled={isLoading}
            />
          </div>

          <Input
            label="Company Name"
            type="text"
            name="companyName"
            placeholder="ABC Properties"
            required
            disabled={isLoading}
          />

          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="you@company.com"
            autoComplete="email"
            required
            disabled={isLoading}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="••••••••"
            autoComplete="new-password"
            required
            disabled={isLoading}
            helperText="Must be at least 8 characters"
          />

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            autoComplete="new-password"
            required
            disabled={isLoading}
          />

          <div className="text-sm text-gray-600">
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                name="terms"
                required
                className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>
                I agree to the{" "}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </label>
          </div>

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Create Account
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
