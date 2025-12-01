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
    const { data: property, error: propertyError } = await db
      .from("properties")
      .select("id, lead_email, lead_webhook, website_url")
      .eq("id", data.propertyId)
      .single();

    if (propertyError || !property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    // Create lead record
    const { data: lead, error: leadError } = await db
      .from("leads")
      .insert({
        first_name: data.firstName || null,
        last_name: data.lastName || null,
        email: data.email,
        phone: data.phone || null,
        move_in_date: data.moveInDate || null,
        bedrooms: data.bedrooms ? parseInt(data.bedrooms) : null,
        message: data.message || null,
        property_id: data.propertyId,
        landing_page_id: data.landingPageId || null,
        source: data.utm_source || "direct",
        medium: data.utm_medium || null,
        campaign: data.utm_campaign || null,
        status: "NEW",
      })
      .select()
      .single();

    if (leadError || !lead) {
      console.error("Error creating lead:", leadError);
      return NextResponse.json(
        { error: "Failed to submit lead" },
        { status: 500 }
      );
    }

    // Update landing page submission count if applicable
    if (data.landingPageId) {
      await db.rpc("increment_landing_page_submissions", {
        page_id: data.landingPageId,
      });
    }

    // Forward lead to property's system
    let forwardedTo: string | null = null;

    // Send to webhook if configured
    if (property.lead_webhook) {
      try {
        await fetch(property.lead_webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lead: {
              id: lead.id,
              firstName: lead.first_name,
              lastName: lead.last_name,
              email: lead.email,
              phone: lead.phone,
              moveInDate: lead.move_in_date,
              bedrooms: lead.bedrooms,
              message: lead.message,
              source: lead.source,
              createdAt: lead.created_at,
            },
            property: {
              id: property.id,
            },
          }),
        });
        forwardedTo = property.lead_webhook;
      } catch (error) {
        console.error("Failed to forward lead to webhook:", error);
      }
    }

    // Send email notification if configured (would integrate with SendGrid/SES)
    if (property.lead_email) {
      // TODO: Send email notification
      // await sendLeadNotificationEmail(property.lead_email, lead);
      forwardedTo = forwardedTo || property.lead_email;
    }

    // Update lead with forwarding info
    if (forwardedTo) {
      await db
        .from("leads")
        .update({
          forwarded_at: new Date().toISOString(),
          forwarded_to: forwardedTo,
        })
        .eq("id", lead.id);
    }

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      redirectUrl: property.website_url,
    });
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { error: "Failed to submit lead" },
      { status: 500 }
    );
  }
}
