import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const leadSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  moveInDate: z.string().optional(),
  bedrooms: z.string().optional(),
  message: z.string().optional(),
  propertyId: z.string(),
  landingPageId: z.string().optional(),
  // UTM parameters
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = leadSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Get property to find lead routing info
    const property = await db.property.findUnique({
      where: { id: data.propertyId },
      select: {
        id: true,
        leadEmail: true,
        leadWebhook: true,
        websiteUrl: true,
      },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    // Create lead record
    const lead = await db.lead.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone || null,
        moveInDate: data.moveInDate ? new Date(data.moveInDate) : null,
        bedrooms: data.bedrooms ? parseInt(data.bedrooms) : null,
        message: data.message || null,
        propertyId: data.propertyId,
        landingPageId: data.landingPageId || null,
        source: data.utm_source || "direct",
        medium: data.utm_medium || null,
        campaign: data.utm_campaign || null,
        status: "NEW",
      },
    });

    // Update landing page submission count if applicable
    if (data.landingPageId) {
      await db.landingPage.update({
        where: { id: data.landingPageId },
        data: { submissions: { increment: 1 } },
      });
    }

    // Forward lead to property's system
    let forwardedTo: string | null = null;

    // Send to webhook if configured
    if (property.leadWebhook) {
      try {
        await fetch(property.leadWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lead: {
              id: lead.id,
              firstName: lead.firstName,
              lastName: lead.lastName,
              email: lead.email,
              phone: lead.phone,
              moveInDate: lead.moveInDate,
              bedrooms: lead.bedrooms,
              message: lead.message,
              source: lead.source,
              createdAt: lead.createdAt,
            },
            property: {
              id: property.id,
            },
          }),
        });
        forwardedTo = property.leadWebhook;
      } catch (error) {
        console.error("Failed to forward lead to webhook:", error);
      }
    }

    // Send email notification if configured (would integrate with SendGrid/SES)
    if (property.leadEmail) {
      // TODO: Send email notification
      // await sendLeadNotificationEmail(property.leadEmail, lead);
      forwardedTo = forwardedTo || property.leadEmail;
    }

    // Update lead with forwarding info
    if (forwardedTo) {
      await db.lead.update({
        where: { id: lead.id },
        data: {
          forwardedAt: new Date(),
          forwardedTo,
        },
      });
    }

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      redirectUrl: property.websiteUrl,
    });
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { error: "Failed to submit lead" },
      { status: 500 }
    );
  }
}
