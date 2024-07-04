import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";

// Custom CORS Handling
function handleCors(req: NextRequest): NextResponse | null {
  const origin = req.headers.get("origin");
  const allowedOrigins = [
    "https://parazone.tn",
    "http://parazone.tn",
    "http://localhost:3003",
  ];

  if (allowedOrigins.includes(origin || "")) {
    const response = NextResponse.next();
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set("Access-Control-Allow-Origin", origin || "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type,Authorization"
    );

    // Handle preflight requests
    if (req.method === "OPTIONS") {
      response.headers.set("Access-Control-Max-Age", "86400"); // Cache preflight request for 24 hours
      return new NextResponse(null, { status: 204 });
    }
    return response;
  }
  return null;
}

// Middleware function
export async function middleware(req: NextRequest) {
  // Run the custom CORS handling
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  if (req.nextUrl.pathname.startsWith("/api/category")) {
    try {
      const response = await axios.get(
        "https://admin.parazone.tn/items/category?limit=-1"
      );
      return NextResponse.json(response.data);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to fetch data from Directus API" },
        { status: 500 }
      );
    }
  }

  if (req.nextUrl.pathname.startsWith("/api/product")) {
    try {
      const response = await axios.get(
        "https://admin.parazone.tn/items/product?fields=brand_id.*,store_id.*,*&limit=-1"
      );
      return NextResponse.json(response.data);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to fetch data from Directus API" },
        { status: 500 }
      );
    }
  }

  if (req.nextUrl.pathname.startsWith("/api/price")) {
    try {
      const response = await axios.get(
        "https://admin.parazone.tn/items/price?fields=store_id.*,*&limit=-1"
      );
      return NextResponse.json(response.data);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to fetch data from Directus API" },
        { status: 500 }
      );
    }
  }

  if (req.nextUrl.pathname.startsWith("/api/relation")) {
    try {
      const response = await axios.get(
        "https://admin.parazone.tn/items/relation?limit=-1"
      );
      return NextResponse.json(response.data);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to fetch data from Directus API" },
        { status: 500 }
      );
    }
  }

  if (req.nextUrl.pathname.startsWith("/api/brand")) {
    try {
      const response = await axios.get(
        "https://admin.parazone.tn/items/brand?limit=-1"
      );
      return NextResponse.json(response.data);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to fetch data from Directus API" },
        { status: 500 }
      );
    }
  }

  if (req.nextUrl.pathname.startsWith("/api/store")) {
    try {
      const response = await axios.get(
        "https://admin.parazone.tn/items/store?limit=-1"
      );
      return NextResponse.json(response.data);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to fetch data from Directus API" },
        { status: 500 }
      );
    }
  }

  // Handle default route
  if (req.nextUrl.pathname === "/") {
    return new NextResponse("Hello World");
  }

  if (req.nextUrl.pathname === "/no-cors") {
    return new NextResponse("This is a no-cors endpoint");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
