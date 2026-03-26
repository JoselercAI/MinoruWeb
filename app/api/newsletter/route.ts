import { NextResponse } from "next/server";
import {
  getBeehiivPublicationId,
  getNewsletterRedirectPath,
} from "@/lib/newsletter";

const redirectToPage = (request: Request, state: string, pathname: string) => {
  const url = new URL(pathname, request.url);
  url.searchParams.set("newsletter", state);

  if (pathname === "/") {
    url.hash = "newsletter";
  }

  return NextResponse.redirect(url);
};

export async function POST(request: Request) {
  const data = await request.formData();
  const email = data.get("email");
  const redirectPath = getNewsletterRedirectPath(data.get("redirect"));
  const publicationId = getBeehiivPublicationId();

  if (typeof email !== "string" || !email.includes("@")) {
    return redirectToPage(request, "error", redirectPath);
  }

  if (!process.env.BEEHIIV_API_KEY || !publicationId) {
    return redirectToPage(request, "missing", redirectPath);
  }

  try {
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.BEEHIIV_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
        }),
      },
    );

    return redirectToPage(request, response.ok ? "success" : "error", redirectPath);
  } catch {
    return redirectToPage(request, "error", redirectPath);
  }
}
