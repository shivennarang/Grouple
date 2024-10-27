import { onAuthenticatedUser } from "@/actions/auth"
import { client } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

// Initialize Stripe instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2024-09-30.acacia",
})

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const groupid = searchParams.get("groupid")

    // Validate the groupid before continuing
    if (!groupid) {
      return NextResponse.json({ error: 'Missing groupid parameter' }, { status: 400 });
    }

    // Create Stripe account
    const account = await stripe.accounts.create({
      type: "standard",
      country: "US",
      business_type: "individual",
    })

    if (!account) {
      throw new Error("Failed to create Stripe account");
    }

    // Log the account details for debugging purposes
    console.log("Stripe Account Created: ", account);

    // Fetch the authenticated user
    const user = await onAuthenticatedUser()

    // Ensure user is authenticated
    if (!user) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    // Update the user in the database with the new Stripe account ID
    const updatedUser = await client.user.update({
      where: {
        id: user.id,
      },
      data: {
        stripeId: account.id,
      },
    })

    // Log the user update for debugging
    console.log("User Updated with Stripe Account: ", updatedUser);

    // Create Stripe Account Link for onboarding
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
    
      return_url: `http://localhost:3000/group/${groupid}/settings/integrations`,
      type: "account_onboarding",
    })

    // Log the account link
    console.log("Stripe Account Link Created: ", accountLink);

    // Return the account onboarding link to the frontend
    return NextResponse.json({
      url: accountLink?.url, // Safely access the URL
    })

  } catch (error: any) {
    console.error("Error in Stripe Integration:", error); // Log full error for debugging
    return NextResponse.json(
      {
        error: error.message || "An error occurred when calling the Stripe API",
      },
      { status: 500 }
    )
  }
}
