"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  Phone,
  Mail,
  Check,
  Building2,
  Calendar,
  DollarSign,
} from "lucide-react";

interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  amenities: string[];
  description: string | null;
  leadEmail: string | null;
  websiteUrl: string | null;
}

interface LandingPage {
  id: string;
  slug: string;
  title: string;
  headline: string | null;
  subheadline: string | null;
  heroImage: string | null;
  content: unknown;
}

interface LandingPageRendererProps {
  landingPage: LandingPage;
  property: Property;
}

export function LandingPageRenderer({
  landingPage,
  property,
}: LandingPageRendererProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      moveInDate: formData.get("moveInDate"),
      bedrooms: formData.get("bedrooms"),
      message: formData.get("message"),
      propertyId: property.id,
      landingPageId: landingPage.id,
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setIsSubmitted(true);

      // Redirect to property website if available
      if (property.websiteUrl) {
        setTimeout(() => {
          window.location.href = property.websiteUrl!;
        }, 2000);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        {landingPage.heroImage && (
          <div className="absolute inset-0">
            <Image
              src={landingPage.heroImage}
              alt={property.name}
              fill
              className="object-cover opacity-40"
            />
          </div>
        )}
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {landingPage.headline || property.name}
            </h1>
            {landingPage.subheadline && (
              <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-300">
                {landingPage.subheadline}
              </p>
            )}
            <div className="mt-6 flex items-center justify-center gap-2 text-gray-300">
              <MapPin className="h-5 w-5" />
              <span>
                {property.address}, {property.city}, {property.state}{" "}
                {property.zip}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Property Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            {property.description && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  About {property.name}
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {property.description}
                </p>
              </div>
            )}

            {/* Amenities */}
            {property.amenities.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Amenities</h2>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {property.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-gray-600"
                    >
                      <Check className="h-5 w-5 text-green-500" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Lead Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 shadow-lg">
              <CardContent className="p-6">
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Thank You!
                    </h3>
                    <p className="mt-2 text-gray-600">
                      We&apos;ve received your inquiry and will be in touch
                      shortly.
                    </p>
                    {property.websiteUrl && (
                      <p className="mt-4 text-sm text-gray-500">
                        Redirecting you to our website...
                      </p>
                    )}
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Schedule a Tour
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Fill out the form below and we&apos;ll get back to you
                      within 24 hours.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                      {error && (
                        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                          {error}
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          name="firstName"
                          placeholder="First Name"
                          required
                          disabled={isSubmitting}
                        />
                        <Input
                          name="lastName"
                          placeholder="Last Name"
                          required
                          disabled={isSubmitting}
                        />
                      </div>

                      <Input
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        required
                        disabled={isSubmitting}
                      />

                      <Input
                        name="phone"
                        type="tel"
                        placeholder="Phone Number"
                        disabled={isSubmitting}
                      />

                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          <Input
                            name="moveInDate"
                            type="date"
                            className="pl-10"
                            disabled={isSubmitting}
                          />
                        </div>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          <select
                            name="bedrooms"
                            className="h-10 w-full rounded-md border border-gray-300 bg-white pl-10 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                            disabled={isSubmitting}
                          >
                            <option value="">Bedrooms</option>
                            <option value="0">Studio</option>
                            <option value="1">1 Bed</option>
                            <option value="2">2 Bed</option>
                            <option value="3">3+ Bed</option>
                          </select>
                        </div>
                      </div>

                      <textarea
                        name="message"
                        placeholder="Message (optional)"
                        rows={3}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        disabled={isSubmitting}
                      />

                      <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        isLoading={isSubmitting}
                      >
                        Request Information
                      </Button>

                      <p className="text-center text-xs text-gray-500">
                        By submitting, you agree to our privacy policy.
                      </p>
                    </form>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="mt-6 space-y-3 text-sm text-gray-600">
              {property.leadEmail && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <a
                    href={`mailto:${property.leadEmail}`}
                    className="hover:text-blue-600"
                  >
                    {property.leadEmail}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>
                  {property.address}, {property.city}, {property.state}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Powered by CREX Digital
          </p>
        </div>
      </footer>
    </div>
  );
}
