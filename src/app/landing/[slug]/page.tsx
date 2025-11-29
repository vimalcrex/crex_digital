import { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { LandingPageRenderer } from "@/components/landing/renderer";

interface LandingPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: LandingPageProps): Promise<Metadata> {
  const { slug } = await params;

  const landingPage = await db.landingPage.findUnique({
    where: { slug },
    select: {
      title: true,
      metaTitle: true,
      metaDescription: true,
    },
  });

  if (!landingPage) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: landingPage.metaTitle || landingPage.title,
    description: landingPage.metaDescription,
  };
}

export default async function LandingPage({ params }: LandingPageProps) {
  const { slug } = await params;

  // Get landing page data
  const landingPage = await db.landingPage.findUnique({
    where: { slug, status: "PUBLISHED" },
    include: {
      property: {
        select: {
          id: true,
          name: true,
          address: true,
          city: true,
          state: true,
          zip: true,
          amenities: true,
          description: true,
          leadEmail: true,
          websiteUrl: true,
        },
      },
      template: true,
    },
  });

  if (!landingPage) {
    notFound();
  }

  // Track page view
  await db.landingPage.update({
    where: { id: landingPage.id },
    data: { views: { increment: 1 } },
  });

  return (
    <LandingPageRenderer
      landingPage={landingPage}
      property={landingPage.property}
    />
  );
}
