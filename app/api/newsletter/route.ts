import { NextResponse } from "next/server";

const redirectToHome = (request: Request, state: string) => {
  const url = new URL("/", request.url);
  url.searchParams.set("newsletter", state);
  url.hash = "newsletter";
  return NextResponse.redirect(url);
};

export async function POST(request: Request) {
  const data = await request.formData();
  const email = data.get("email");

  if (typeof email !== "string" || !email.includes("@")) {
    return redirectToHome(request, "error");
  }

  if (!process.env.BEEHIIV_API_KEY || !process.env.BEEHIIV_PUBLICATION_ID) {
    return redirectToHome(request, "missing");
  }

  try {
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${process.env.BEEHIIV_PUBLICATION_ID}/subscriptions`,
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

    return redirectToHome(request, response.ok ? "success" : "error");
  } catch {
    return redirectToHome(request, "error");
  }
}
