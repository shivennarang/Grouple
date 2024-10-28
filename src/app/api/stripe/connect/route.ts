import { onAuthenticatedUser } from "@/actions/auth";
import { client } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2024-09-30.acacia",
});

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const groupid = searchParams.get("groupid");

    // Validate the groupid before continuing
    if (!groupid) {
      return NextResponse.json(
        { error: "Missing groupid parameter" },
        { status: 400 }
      );
    }

    // Fetch the authenticated user
    const user = await onAuthenticatedUser();
    if (!user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    // Create Stripe account
    const account = await stripe.accounts.create({
      type: "standard",
      country: "US",
      business_type: "individual",
    });

    if (!account) {
      throw new Error("Failed to create Stripe account");
    }

    console.log("Stripe Account Created: ", account);

    // Update the user in the database with the new Stripe account ID
    const updatedUser = await client.user.update({
      where: { id: user.id },
      data: { stripeId: account.id },
    });

    console.log("User Updated with Stripe Account: ", updatedUser);

    // Create Stripe Account Link for onboarding
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `https://grouple-oe67.vercel.app/callback/stripe/refresh`,
      return_url: `https://grouple-oe67.vercel.app/group/${groupid}/settings/integrations`,
      type: "account_onboarding",
    });

    console.log("Stripe Account Link Created: ", accountLink);

    // Return the account onboarding link to the frontend
    return NextResponse.json({
      url: accountLink.url, // Safely access the URL
    });
  } catch (error: any) {
    console.error("Error in Stripe Integration:", error.message || error);

    // Send back detailed error message
    return NextResponse.json(
      {
        error: error.message || "An error occurred when calling the Stripe API",
      },
      { status: 500 }
    );
  }
}
